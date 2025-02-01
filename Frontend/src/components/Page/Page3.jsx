import React from "react";


function Page3(){


    return (
        <>
         <div className="flex flex-col-reverse justify-center md:justify-around items-center  h-fit bg-white w-full px-2 py-5 md:mt-0 md:flex-row">
            <div className="w-9/12 md:w-1/5 mt-4 mb-4">
                <img className="round" src="/Sharepage2.jpg" alt="" />
            </div>
            <div>
                <h1 className="md:text-5xl text-xl font-bold font-sans mb-2">Lightning-fast Sharing <br />at your fingertips!
                </h1>
                <p>Our state-of-the-art platform means no more wasting <br />time on slow transfer</p>
            </div>
           </div>
        </>    
    )

}
export default Page3;