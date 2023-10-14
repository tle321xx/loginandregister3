import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState()

    axios.defaults.withCredentials = true
    useEffect(()=>{
        axios
      .get("http://localhost:3000/dashboard")
      .then((res) => {
        if(res.data === 'Success'){
            setSuccess("Successed OK")
        } else {
            navigate('/')
        }
      })
      .catch((err) => console.log(err));
    },[])
  return (
    <div>
      <Navbar />
      Dashboard
      <p>{success}</p>
    </div>
  );
};

export default Dashboard;
