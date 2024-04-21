import React from "react";


  function TempHome(){


    return (
        <>
        <div className="flex justify-around items-center bg-sky-800  ">
          <h1 className="font-bold text-orange-950 text-3xl">ShareItNow</h1>
          <div className="flex gap-2">
            <button className="border-2 border-blue-500 px-2 py-1 font-bold">Login</button>
            <button className="outline-none bg-blue-500 text-white font-bold px-2 py-1 rounded-md">Sign Up</button>
          </div>
        </div>
        </>
    )
  }
  export default TempHome