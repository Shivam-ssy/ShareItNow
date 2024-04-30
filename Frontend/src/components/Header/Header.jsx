import React from "react";
 function Navigators(){

    return(
        <>
        <div className="fixed block md:hidden mt-2 top-20 bg-white z-50 right-4 ">

        <div className="flex justify-center">
            <div className="flex  justify-center  flex-col   w-full   ">
               <div className="py-3 px-8 cursor-default hover:bg-gray-500 ">Home</div>
               <div className="py-3 px-8 cursor-default hover:bg-gray-500 ">Myfile</div>
               <div className="py-3 px-8 cursor-default hover:bg-gray-500 ">Share Directly</div>
               <div className="py-3 px-8 cursor-default hover:bg-gray-500 ">Upload</div>
               <div className="py-3 px-8 cursor-default hover:bg-gray-500 ">Profile</div>
            </div>

        </div>
        </div>
        </>
    )
 }
 export default Navigators;