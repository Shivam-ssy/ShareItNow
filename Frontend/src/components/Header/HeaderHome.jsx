import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function HeaderHome({  className }) {
  const isuser=useSelector((state)=>state.auth.status)
  const name=useSelector((state)=>state.auth.userData)
  // console.log("user data from header home",name?.data.name)
  return (
    <>
      <div
        className={`flex z-50 justify-between gap-10  md:gap-40 lg:gap-0  items-center bg-gray-900 px-5  lg:px-10 py-5 ${className} `}
      >
        <h1 className="font-bold shadow text-3xl md:text-5xl">ShareNest</h1>
        {isuser && (
          <div className="md:flex flex-wrap hidden  text-white gap-4 items-center">
            <Link to="/Home">
              {" "}
              <div className="cursor-pointer">Home</div>
            </Link>
            <Link to="/Home/myfile">
              {" "}
              <div className="cursor-pointer">My files</div>
            </Link>
            <Link to="/Home/share/upload">
              {" "}
              <div className="cursor-pointer">Upload File</div>
            </Link>
            {/* <Link to="/Home/share/directshare"> <div className="cursor-pointer">Share directly</div></Link> */}
            <Link to="/Home/profile">
              {" "}
              <div className="outline-none ms-9 flex items-center gap-2 px-2 py-1 font-bold text-white">
                <img width="20px" src="/user-3-fill.svg" alt="" />
                {name?.name}
              </div>
            </Link>
          </div>
        )}
        {
          !isuser &&
          
        <div className="flex gap-5">
          <Link to="/Login">  <button className="px-4 py-2  block rounded-lg hover:scale-105 ease-out hover:bg-[#ce3f21] bg-gray-100 font-bold  ">Login</button></Link>
          <Link to="/SignUp"><button className="px-4 py-2 hidden sm:block rounded-lg hover:scale-105 ease-out bg-[#ce3f21] hover:bg-gray-100 font-bold">SignUp</button></Link>

        </div>
        }
        {/* <div className="md:block cursor-pointer hidden">
          <img className="w-8" src="/menu-5-fill.svg" alt="" />
        </div> */}
      </div>
    </>
  );
}
export default HeaderHome;
