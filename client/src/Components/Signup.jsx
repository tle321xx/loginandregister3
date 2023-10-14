import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", data)
      .then((res) => {
        alert("Created");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div>Signup</div>
      <form onSubmit={handleSubmit}>
        <div className="from-container">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your name"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter your name"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already Have an account</p>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Signup;
