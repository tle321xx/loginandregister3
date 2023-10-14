const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log("Error connect to database", err));

const verifyUser = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.json("Token not found")
    } else {
        jwt.verify(token, process.env.JWT, (err, decoded)=> {
            if(err){
                return res.json("error with token")
            } else {
                if(decoded.role === 'admin'){
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dashboard', verifyUser, (req,res)=>{
    return res.json("Success")
})

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT,
            { expiresIn: "1d" }
          );
          res.cookie('token', token)
          return res.json({Status:"Success", role: user.role})
        } else {
          return res.json("Password incorrect");
        }
      });
    } else {
      return res.json("Not exist");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
