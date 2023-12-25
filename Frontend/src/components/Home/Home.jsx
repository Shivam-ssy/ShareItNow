import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../Header/HeaderHome";
import Drop from "../Page/DropZone";
import Navigators from "../Header/Header";
import config from "../../../Conf/cofig";

function Home(){
        const [isuser,setUser]=useState(null)
        const [validUser,setValidUser]=useState(false)
        const [loader,setloader]=useState(true);
        useEffect(()=>{ 
            const fetchUser= async ()=>{
                const fetchData= await fetch(config.homeUrl,{
                    method:'GET',
                    credentials:'include',
                }).then((fetchData)=>fetchData.json()). finally(()=>setloader(false))
                console.log(fetchData)
                if(fetchData.status){
                    if(fetchData.user){
                        setValidUser(fetchData.user)
                        setUser(fetchData.userdata.name)
                        
                      
                    }
                }
            }
            fetchUser();
           
        },[])
        if(!loader){
             if(!validUser){
                console.log(isuser)
                return (
                    <>
                    <HeaderHome name={isuser} className=" fixed w-full"/>
                    <div className="w-full h-screen flex items-center justify-center p-2"style={{
                        backgroundImage:`url(background.jpg)`,
                        backgroundPosition:`center`,
                        backgroundAttachment:`scroll`,
                        backgroundSize:`cover`,
                        backgroundRepeat:`no-repeat`

                    }}>
            
                        {/* <div className=" bg-blue-200  shadow-xl shadow-slate-300 rounded-3xl p-7 "> */}
                            <Drop/>
                        {/* </div> */}
                      
                    </div>
                  
                    </>
              )
             }
             else{
                return (
                    <>
                     <HeaderHome name="!User"/>
                    <div className="w-full h-screen bg-slate-600 flex items-center justify-center p-2">
                    <div className="bg-blue-200  shadow-xl shadow-slate-300 rounded-3xl p-7">
                        <div>
                            <h1 className="text-red-800">User Not Found Back to <Link to="/Login" className="text-blue-800">Login</Link></h1>
                        </div>
                        </div>
                        </div>

                    </>
                )
             }
        }

        }    
   
export default Home;
