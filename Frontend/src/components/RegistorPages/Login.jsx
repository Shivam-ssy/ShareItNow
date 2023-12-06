import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import config from "../../../Conf/cofig";
import axios from "axios"
function Login(){
    
    const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const navigate=useNavigate()
    const handleSubmit= async function(e){
        e.preventDefault();
   
    const response= await fetch(config.loginUrl,{
     method:'POST',
     credentials:'include',
      headers:{
            
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
            password
        })
    }).then((response)=>response.json())
        if(response.status){
            if(response.user){
                 
                 navigate("/Home");
               
            }
            else{
               alert("Invalid Email or password")
            }
        }
        else{
            alert("Something went wrong please try again")
        }
            
        
}
    return(
        <>
       
       <div className="flex justify-center w-full h-screen items-center px-3">
        <div className="flex justify-center items-center w-fit flex-col px-5 py-2 shadow-xl shadow-slate-700">
           <div className="flex flex-wrap flex-col justify-center mb-10 items-center">
           <h1 className="font-extrabold text-5xl shadow">ShareItNow</h1>
            <h6 className="text-center">Please Enter Your Email And Password to Login Your Account</h6>
           </div>
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-2">
            <label htmlFor="email" className="hidden">Email</label>
            <input type="email" required name="email" id="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl px-3 py-2 border-slate-300 border-2 "/>
            <label htmlFor="password" className="hidden">Password</label>
            <input type="password" required name="password" id="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl px-3 py-2 border-2 border-slate-300 "/>
            <input type="submit" value="Login" className=" mt-5 mb-5 shadow cursor-pointer font-bold text-xl px-3 py-2 bg-slate-200 hover:bg-blue-500 active:bg-slate-600" />
            <div>Did't Have Account ?<Link to="/Signup" className="text-blue-800"> Signup</Link></div>
        </form>
       </div>
       </div>
        </>
    )
}
export default Login;