import React  from "react";

  function HeaderHome({name,className}){
    
   
     return (
        <>
        <div className={`flex justify-around items-center bg-sky-800 py-2 ${className} `}>
          <h1 className="font-bold shadow text-3xl">ShareItNow</h1>
          <div className="flex">
            <button className="outline-none px-2 py-1 font-bold text-white">{name}</button>
            
          </div>
        </div>
        </>
     )
  }
  export default HeaderHome;