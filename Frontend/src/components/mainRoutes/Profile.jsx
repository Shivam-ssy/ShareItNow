import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../../../Conf/cofig";
import { useNavigate } from "react-router-dom";import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const data=useSelector((state)=>state.auth.userData)
    const [oldPassword, setOldPassword]=useState("")
    const [newPassword, setNewPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const [ispasswordChange, setpasswodChange] = useState(false);
    const [validUser, setValidUser] = useState(false);
    const navigate=useNavigate()
    // useEffect(()=>{
    //     const fetchUser= async ()=>{
    //         const fetchData= await fetch(config.getCurrentUser,{
    //             method:'GET',
    //             credentials:'include',
    //         }).then((res)=>res.json())
    //         console.log(fetchData)
    //         if(fetchData.statusCode===200){
    //                 setValidUser(true)
    //                 setEmail(fetchData.data.email)
    //                 setName(fetchData.data.name)
    //         }
    //     }
    //     fetchUser();
  
    // },[])
    const logout= async ()=>{
      const response=await  fetch(config.logout,{method:"POST",credentials: 'include'})
      if(response.ok){
        window.location.href = "/";
      }
    }
    const changePassword= async ()=>{
     
      if(newPassword===confirmPassword){
        const formdata= new FormData()
        formdata.append("oldPassword",oldPassword)
        formdata.append("newPassword",newPassword)
          const res= await fetch(config.changePassword,{
            method:"POST",
            credentials:"include",
            headers:{
              'Content-Type':'application/json',
          },
            body:JSON.stringify({
              oldPassword,
              newPassword
          })
          })
          if (res.ok) {
              toast.success("Password change Successfully")
          }
          else{
            toast.error("Something went Wrong, Error in Password Change");
          }
      }
      setpasswodChange(!ispasswordChange)
    }
  return (
    <>
      <div
        className="w-full h-screen flex  justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)`,
        }}
      >
                    <ToastContainer className="mt-20" position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        {
          ispasswordChange === false ? (
        <div className="flex flex-col bg-gray-200 rounded-xl py-20 px-4 gap-3 w-80">
          <div className=" self-center bg-black rounded-full p-5">
            <img className="h-32" src="/user-3-fill.svg" alt="" />
          </div> 
          
          <div>

          <label htmlFor="name" className="hidden">
          Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Full Name"
            value={data?.name?? ""}
            readOnly
            className="w-full rounded-xl focus:outline-none px-3 py-2 border-slate-300 border-2 "
          />
          </div>
          <div>
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={data?.email ?? ""}   
            readOnly
            className="w-full rounded-xl focus:outline-none px-3 py-2 border-slate-300 border-2 "
          />
        </div>
          <div onClick={()=>setpasswodChange(true)} className="w-full text-green-400 text-center cursor-pointer font-bold py-2 rounded-xl">Change Password</div>
          <div onClick={()=>logout()} className="w-full text-center cursor-pointer font-bold py-2 rounded-xl bg-red-600">Log out</div>
          </div>

          ):(
            <div className=" bg-gray-200 rounded-xl py-20 px-4 gap-3 w-80">
          <form className="flex flex-col gap-3">
        <div>

          
          <label htmlFor="oldPassword" className="hidden">
            Old Password
          </label>
          <input
            type="password"
            name="OldPassword"
            id="oldpassword"
            placeholder="Old Password"
            autoComplete="off"
            value={oldPassword} 
            onChange={(e)=>setOldPassword(e.target.value)}  
            className="w-full rounded-xl focus:outline-none px-3 py-2 border-slate-300 border-2 "
          />
        </div>
        <div>
          <label htmlFor="NewPassword" className="hidden">
           New Password
          </label>
          <input
            type="password"
            name="NewPassword"
            id="NewPassword"
            placeholder="New Password"
            value={newPassword}
            autoComplete="off"
            onChange={(e)=>setNewPassword(e.target.value)}   
            className="w-full rounded-xl focus:outline-none px-3 py-2 border-slate-300 border-2 "
          />
        </div>
        <div>
          <label htmlFor="ConfirmPassword" className="hidden">
           Confirm Password
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            id="ConfirmPassword"
            placeholder="ConfirmPassword"
            value={confirmPassword}   
            autoComplete="off"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full rounded-xl focus:outline-none px-3 py-2 border-slate-300 border-2 "
          />
        </div>
        <div onClick={()=>changePassword()} className="w-full text-center cursor-pointer font-bold py-2 rounded-xl bg-green-400">Change Password</div>
        </form>
        </div>
            
          )
        }
      </div>
    </>
  );
}
export default Profile;
