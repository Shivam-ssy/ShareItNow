import React from "react";

function Footer(){
   
        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional: Add smooth scrolling behavior
          });
        };
    
    return(
        <>
        <div className="ml-10 mr-10 md:(ml-40 mr-40) py-10">
            
            <button className="w-full outline-none bg-blue-600 text-white text-3xl font-semibold " onClick={scrollToTop}>Back to Top</button>
            
        </div>
        
        </>
    )
}
export default Footer;