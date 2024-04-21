import React from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Footer from "../Footer/Footer";

 function GetStarted(){
    return (
        <>
        
        <div>
        <div className=''>
      <Page1/>
      <Page2/>  
     <Page3/>
     <Footer/>
     
     </div>
        </div>
        
        </>
    )
 }
 export default GetStarted