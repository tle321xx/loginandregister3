const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "visitor"
  }
});

const UserModel = mongoose.model("user", employeeSchema);
module.exports = UserModel;
