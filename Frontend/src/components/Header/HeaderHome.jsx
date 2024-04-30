import React  from "react";
import { Link } from "react-router-dom";
  function HeaderHome({name,className}){
    
   
     return (
        <>
        <div className={`flex justify-between gap-40 lg:gap-0  items-center bg-gray-900 p-5  lg:px-10 py-5 ${className} `}>
          <h1 className="font-bold shadow text-5xl">ShareItNow</h1>
          <div className="md:flex flex-wrap hidden  text-white gap-4 items-center">
           <Link to="/Home"> <div className="cursor-pointer">Home</div></Link>
           <Link to="/Home/myfile"> <div className="cursor-pointer">My files</div></Link>
           <Link to="/Home/share/upload"> <div className="cursor-pointer">Upload File</div></Link>
           <Link to="/Home/share/directshare"> <div className="cursor-pointer">Share directly</div></Link>
         <Link to="/Home/profile">  <div className="outline-none ms-9 flex items-center gap-2 px-2 py-1 font-bold text-white"><img  width="20px" src="/user-3-fill.svg" alt="" />{name}</div></Link> 
            
          </div>
          <div className="block cursor-pointer md:hidden"><img className="w-8" src="/menu-5-fill.svg" alt="" /></div>
        </div>
        </>
     )
  }
  export default HeaderHome;