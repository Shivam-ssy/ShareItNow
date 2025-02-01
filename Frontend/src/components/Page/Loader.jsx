import React from 'react'
import { useSelector } from 'react-redux';

function Loader() {
    const loader=useSelector((state)=>state.auth.loader)
    return (
            <>
              <div className="w-full h-screen bg-white flex items-center justify-center p-2">
                {
                  !loader ? ( <div className="hypnotic2 h-20 w-20 "></div>) : (  
                  <div className="bg-blue-200  shadow-xl shadow-slate-300 rounded-3xl p-7">
                  <div>
                    <h1 className="text-red-800">
                      User Not Found Back to{" "}
                      <Link to="/Login" className="text-blue-800">
                        Login
                      </Link>
                    </h1>
                  </div>
                </div>)
                }
              
              </div>
            </>
          );
}

export default Loader
