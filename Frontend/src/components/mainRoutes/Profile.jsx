import React from "react";
import { useState, useEffect } from "react";
import config from "../../../Conf/cofig";
import { useNavigate } from "react-router-dom";
function Profile() {
    const [email,setEmail]=useState("");
    const [name, setName]=useState("")
    const [isuser, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchUser= async ()=>{
            const fetchData= await fetch(config.getCurrentUser,{
                method:'GET',
                credentials:'include',
            }).then((res)=>res.json())
            console.log(fetchData)
            if(fetchData.statusCode===200){
                    setValidUser(true)
                    setEmail(fetchData.data.email)
                    setName(fetchData.data.name)
            }
        }
        fetchUser();
  
    },[])
    const logout= async ()=>{
      const response=await  fetch(config.logout,{method:"POST",credentials: 'include'})
      if(response.ok){
        window.location.href = "/";
      }
    }
  console.log(name)  
  return (
    <>
      <div
        className="w-full h-screen flex  justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)`,
        }}
      >
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
            value={name ?? ""}
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
            value={email ?? ""}   
            readOnly
            className="w-full rounded-xl focus:outline-none px-3 py-2 border-slate-300 border-2 "
          />
        </div>
          <div onClick={()=>logout()} className="w-full text-center cursor-pointer font-bold py-2 rounded-xl bg-red-600">Log out</div>
          </div>
      </div>
    </>
  );
}
export default Profile;
