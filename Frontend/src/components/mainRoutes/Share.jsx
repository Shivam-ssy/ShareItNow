import React from "react";
import Drop from "../Page/DropZone";
 function SharePage(){
    return(
        <>
        <div className="w-full h-screen flex items-center justify-center"
        style={{
            backgroundImage: `linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)`
        }}>
            <Drop/>
        </div>
        </>
 ) 
 }
 export default SharePage;