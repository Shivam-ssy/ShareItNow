import React from "react";
import { Link } from "react-router-dom";
function Footer(){
   
        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional: Add smooth scrolling behavior
          });
        };
    
    return(
        <>
        <div className=" w-full bg-[#ce3f21] py-5 font-bold px-4 gap-2 text-gray-900 flex flex-col md:flex-row justify-center md:justify-around ">
            <div>
            <Link to="https://github.com/Shivam-ssy/ShareItNow">Click Here for repo</Link>
            </div>
            {/* <button className="w-full outline-none bg-blue-600 text-white text-3xl font-semibold " onClick={scrollToTop}>Back to Top</button> */}
            {/* <div>
                <h3 className="text-3xl font-bold">Some Links</h3>
                <ul className="flex flex-col gap-2 mt-3">
                  <li className="hover:text-[#ce3f21]">
                    <Link to="/Login">Login</Link>
                  </li>
                  <li className="hover:text-[#ce3f21]">
                    <Link to="signup">Sign Up</Link>
                  </li>
                  <li className="hover:text-[#ce3f21]">
                    <Link to="https://github.com/Shivam-ssy/ShareItNow">Click Here for repo</Link>
                  </li>
                </ul>
            </div> */}
            <div>
              <h3 className="">Made with ❤️ by <Link className="text-white" to="https://www.linkedin.com/in/shivam-singh-yadav-743657240/">Shivam Singh Yadav</Link></h3>
            </div>
        </div>
        
        </>
    )
}
export default Footer;