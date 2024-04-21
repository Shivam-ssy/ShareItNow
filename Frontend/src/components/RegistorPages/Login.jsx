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
        const hasAccess = await document.hasStorageAccess();
        if (!hasAccess) {
            await document.requestStorageAccess();
        }
    const response= await fetch(config.loginUrl,{
     method:'POST',
     credentials:'include',
      headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            email,
            password
        })
    })
    console.log(response)
        if(response.status===200){
            navigate("/Home");
        }
        else{
            if(response.status===400) {
                alert(" Email is required")
            } 
           else if(response.status===404){
                alert("User does not exist")
            }
            else if(response.status===401){
                alert("Invalid user credentials")
            }
            else{
                alert(response.message || "Something went wrong plese try again later")
            }
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
            onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="w-full rounded-xl px-3 py-2 border-slate-300 border-2 "/>
            <label htmlFor="password" className="hidden">Password</label>
            <input type="password" required name="password" id="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} autoComplete="password" className="w-full rounded-xl px-3 py-2 border-2 border-slate-300 "/>
            <input type="submit" value="Login" className=" mt-5 mb-5 shadow cursor-pointer font-bold text-xl px-3 py-2 bg-slate-200 hover:bg-blue-500 active:bg-slate-600" />
            <div>Did't Have Account ?<Link to="/Signup" className="text-blue-800"> Signup</Link></div>
        </form>
       </div>
       </div>
        </>
    )
}
export default Login;
