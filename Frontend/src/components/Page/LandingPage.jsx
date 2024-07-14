import React, { useState } from "react";
 function LandingPage(){
    const [senderBox,setSenderBox]=useState(false)
    const [name,setName]=useState("")
    const [senderEmail,setSenderEmail]=useState("")
    const [recieverEmail,setRecieverEmail]=useState("")
    const sendfile= async ()=>{
            
    }
    return(
        <>
            <div  className="w-full h-auto py-10 md:h-[calc(100vh-80px)] flex flex-col justify-center gap-12 px-5 items-center bg-center bg-cover bg-[url('./image.jpg')]">
            {
                !senderBox &&
                <div className="flex flex-col justify-center w-full items-center">

                    <div className="rounded-full w-72 h-72 bg-gray-200 flex justify-center items-center">
                    <i onClick={()=>{senderBox?setSenderBox(false):setSenderBox(true)}} className="ri-upload-cloud-fill hover:drop-shadow-none hover:scale-[0.95] ease-in-out hover:cursor-pointer text-red-600 filter drop-shadow-[5px_10px_10px_#000] text-[15rem]"></i>
                    </div>
                    <h1 className="text-xl md:text-3xl  font-bold font-serif text-white text-center">Share Your Experience With Us <br /> Drop your file and share</h1>
                    <div className="w-full mt-20 relative">
                        <div className="w-full h-[1px]  bg-white absolute">
                        </div>
                        <div className="absolute w-full cursor-pointer  flex justify-center">
                        <img  style={{ top: '50%', transform: 'translateY(-50%)' }} className="w-10 h-10 bg-white rounded-full p-3  absolute" src="./arrow-down-wide-line.svg" alt="" />
                        </div>
                    </div>
                </div>
                
            }
                   {
                    senderBox &&
                    <div className="flex flex-col gap-3 relative bg-[#ce3f21] rounded-xl py-6 px-8">
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="h-10 md:w-96  rounded-md px-3" name="Name" id="name" placeholder="Name" />
                        <input value={senderEmail} onChange={(e)=>setSenderEmail(e.target.value)} type="email" className="h-10 md:w-96 rounded-md px-3" name="senderEmail" id="SenderEmail" placeholder="Sender Email" required/>
                        <input value={recieverEmail} onChange={(e)=>setRecieverEmail(e.target.value)} type="email" className="h-10 md:w-96 rounded-md px-3" name="reciverEmail" id="RecieverEmail" placeholder="Reciever Email" required />
                        <div>
                        <input type="file" />
                        <p>(File should be less than 100MB)</p>

                        </div>
                        <textarea name="message" id="" cols="30" rows="10"></textarea>
                        <button className="outline-none text-white hover:bg-gray-800 bg-gray-900 rounded-md py-2  font-thin text-lg" type="submit"> Submit</button>
                    </div>
                   }
                   
            </div>
        </>
    )
 }
 export default LandingPage;