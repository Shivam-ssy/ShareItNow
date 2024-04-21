import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../Header/HeaderHome";
import Drop from "../Page/DropZone";
import Navigators from "../Header/Header";
import config from "../../../Conf/cofig";

function Home() {
  const [isuser, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [loader, setloader] = useState(false);
  useEffect(()=>{
      const fetchUser= async ()=>{
          const fetchData= await fetch(config.getCurrentUser,{
            headers:{
              'Accept':'*/*'
          },
              method:'GET',
              credentials:'include',
          })
          .then((fetchData)=>fetchData.json())
          .finally(()=>setloader(false))
          console.log(fetchData)
          if(fetchData.statusCode===200){
                  setValidUser(true)
                  setUser(fetchData.data.name)

          }
      }
      fetchUser();

  },[])
  console.log(isuser);
  if (!loader) {
    if (validUser) {
      return (
        <>
          <div
            className="w-full h-screen grid grid-cols-2 items-center justify-items-center p-2"
            style={{
                backgroundImage: `linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)`
            }}
          >
            {/* <Drop/> */}
            <div>
            <div className="flex flex-col text-[5em]  text-white leading-[0.98em] font-serif ">
             <span className="font-thin">Welcome <br /> to the world of <br /></span> 
             <span className="text-[#ce3f21] font-bold">Sharing</span> 
            </div>
            <div className="text-white mt-2">Here you can upload your file and you can get a link to share or you can direcly <br/> your file to another user</div>
            <Link to="/Home/share/upload">
               <div className="flex items-center duration-200 hover:ease-out hover:shadow-black hover:shadow-xl hover:px-3  hover:font-bold cursor-pointer w-fit p-2 rounded-xl mt-5 bg-[#ce3f21]">Lets get started <img width="20px" src="/arrow-right-line.svg" alt="" /></div>  </Link>
            </div>
           
            <div className="w-[30vw] h-40">
                <img className="rounded-xl rotate-45" src="background.jpg" alt="" />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <HeaderHome name="!User" />
          <div className="w-full h-screen bg-slate-600 flex items-center justify-center p-2">
            <div className="bg-blue-200  shadow-xl shadow-slate-300 rounded-3xl p-7">
              <div>
                <h1 className="text-red-800">
                  User Not Found Back to{" "}
                  <Link to="/Login" className="text-blue-800">
                    Login
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Home;
