import React from "react";
function Page2(){
    return(
        <>
           <div className="flex flex-col justify-center outline-2 outline-slate-800 outline md:justify-around items-center  h-fit bg-white w-full px-2 py-5 md:mt-0 md:flex-row">
            <div>
                <h1 className="md:text-5xl text-xl font-bold font-sans mb-2">Upload,Share, and <br /> Enjoy Unprecedent <br />Peace of Mind
                </h1>
                <p>ShareItNow cutting-edge security ensure confident sharing between users.<br/>
                    You can share upto 200MB of file at once 
                </p>
            </div>
            <div className="w-9/12 md:w-1/5 mt-4">
                <img className="rounded-3xl" src="./sharepage.jpg" alt="" />
            </div>
           </div>
        </>
    )
}
export default Page2;