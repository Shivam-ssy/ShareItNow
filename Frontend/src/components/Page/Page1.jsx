import React from "react";
import {Link} from "react-router-dom"
function Page1() {
  return (
    <>
    <div>
      <div className="w-full h-2/5 md:h-screen flex  justify-center gap-2 items-center py-5 bg-no-repeat bg-center bg-cover " id="home" style={{backgroundImage:`url(/image.jpg)`,}}>
        <div className="flex justify-center items-center flex-col py-5 px-5 bg-slate-100 bg-opacity-50 shadow-red-500 shadow-lg rounded-3xl ">
        <h1 className="font-extrabold text-5xl shadow md:text-9xl">ShareItNow</h1>
        <div className="flex flex-col mt-2 w-full px-8 md:w-fit md:flex-row gap-2">
         <Link to="Login" >
         <button className="border-2 w-full border-blue-800  px-2 py-1 text-2xl font-bold " >
            Login
          </button> 
          </Link>
          <Link to="Signup">
          <button className="outline-none w-full bg-blue-800 text-white font-bold  px-2 py-1 text-2xl rounded-md ">
            SignUp
          </button>
          </Link>
        </div>
        </div>
      </div>
      {/* <div className="w-1/2" style={{backgroundImage:`url("")`}}></div> */}
      </div>
    </>
  );
}

export default Page1;

