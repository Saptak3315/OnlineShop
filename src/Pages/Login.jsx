import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"

function Login() {
  const [username,sun]=useState("");
  const [pass,spass]=useState("")
  const navigate=useNavigate();
  const reg=()=>{
    if(!username||!pass){
        alert("Please Enter Your Username");
    }
    let users=JSON.parse(localStorage.getItem("users")) || {};
    if(users[username]){
        alert("Username Exist");
        return;
    }
    users[username]={password:pass,balance:0,history:[]}
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful");
  }
  const li=()=>{
    let users=JSON.parse(localStorage.getItem("users")) || {};
    if(users[username]&&users[username].password===pass){
        localStorage.setItem("liu",username);
        navigate("/dashboard");
    }
    else {
        alert("Invalid Username or Password");
    }
  }
  return (
    <div>
        <h2>Login/Register</h2>
        <input type="text" placeholder="Enter Your Username" value={username} onChange={(e)=>sun(e.target.value)}/><br/>
        <input type="text" placeholder="Enter Your Password" value={pass} onChange={(e)=>spass(e.target.value)}/><br/>
        <button onClick={reg}>Register</button><br/>
        <button onClick={li}>Login</button>
    </div>
  )
}

export default Login