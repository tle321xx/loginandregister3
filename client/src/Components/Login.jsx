import React, {useState} from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", data)
      .then((res) => {
        console.log(res.data)
        alert("Login Successful");
        if(res.data.Status === 'Success'){
            if(res.data.role === "admin"){
                navigate('/dashboard')
            } else {
                navigate('/')
            }
        }
        // navigate('/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
