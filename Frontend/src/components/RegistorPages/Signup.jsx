import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom"
import config from "../../../Conf/cofig";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name, setName]=useState("")
    const [loader,setloader]=useState(false)

    const handleSubmit=  async function(e){
        e.preventDefault();
        if(isStrongPassword(password)){
          setloader(true)
          
          const response =await fetch(config.registerUrl,{
            method:'POST',
            
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({
              name,
              email,
              password,
            })
          }).finally(()=>setloader(false))
          console.log(response)
          if(response.status===200 || response.status ===201){
            // alert("Register Successfully")
            toast.success("Signup successfull");
          }
          else{
            if(response.status===400){
              toast.error("All fields are required")
            }
            else if(response.status===409){
              toast.error("User with email  already exists")
              console.log(response.message);
            }
            else if(response.status===500){
              toast.error("Something went wrong please try again")
            }
            else{
              toast.error("Something went wrong")
            }
          }
        }
        
        
       
    }
    const isStrongPassword=(password)=>{
        const lengthRegex = /.{8,}/;
        const uppercaseRegex = /[A-Z]/; 
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/; 
        const specialCharacterRegex = /[!@#$%^&*]/; 
      
        return (
          lengthRegex.test(password) &&
          uppercaseRegex.test(password) &&
          lowercaseRegex.test(password) &&
          numberRegex.test(password) &&
          specialCharacterRegex.test(password)
        );
      }

    const handleNameChange = (e) => {
        const inputName = e.target.value;
    
        
        if (/[^a-zA-Z\s]/.test(inputName)) {
          
           e.preventDefault();

        } else {
          setName(inputName); 
        }
      };

    return(
        <>
          <ToastContainer position="top-right" autoClose={5000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

       <div className="flex justify-center w-full h-screen items-center px-3">
        <div className="flex justify-center items-center w-fit flex-col px-5 py-2 shadow-xl shadow-slate-700">
           <div className="flex flex-wrap flex-col justify-center mb-10 items-center">
           <h1 className="font-extrabold text-5xl shadow">ShareItNow</h1>
            <h6 className="text-center">Please Enter Your Email And Password to Login Your Account</h6>
           </div>
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-2">
            <label htmlFor="name" className="hidden">Full Name</label>
            <input type="name" name="name" id="name" required autoComplete="name" placeholder="Full Name" value={name} onChange={handleNameChange} className="w-full rounded-xl px-3 py-2 border-slate-300 border-2 "/>
            
            <label htmlFor="email" className="hidden">Email</label>
            <input type="email" name="email" id="email" required placeholder="Email" autoComplete="email" value={email}
            onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl px-3 py-2 border-slate-300 border-2 "/>
            <label htmlFor="password" className="hidden">Password</label>
            <input type="password" name="password" id="password" required placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} autoComplete="password" className="w-full rounded-xl px-3 py-2 border-2 border-slate-300 "/>
            {password && !isStrongPassword(password) && (
        <div className="text-red-500">
        Please set atleat [a-z][A-Z][0-9][!@#$%^&*]</div>
      )}
            <div className="flex justify-center items-center">
            <input type="submit" value="Signup" className=" mt-5 mb-5 shadow cursor-pointer font-bold text-xl px-3 py-2  bg-slate-200 hover:bg-blue-500 active:bg-slate-600"/>
            {loader &&  <div className="hypnotic h-8 w-8 "></div>}
            </div>
            <div>Already Have Account ? <Link to="/Login" className="text-blue-800">Login</Link></div>
        </form>
       </div>
       </div>
        </>
    )
}
export default SignUp;