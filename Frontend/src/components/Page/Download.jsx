import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderHome from "../Header/HeaderHome";
import config from "../../../Conf/cofig";
  function Download(){
        const {uuid}=useParams();
        const downloadPageUrl=`${config.server}/files/${uuid}`
        const [name,setName]=useState("undefined");
        const [size,setSize]=useState("null");
        const [downloadLink,setDlink]=useState("")
        const detail=async ()=>{
                const dt= await fetch(`${downloadPageUrl}`).then((res)=>res.json())
                console.log(dt)
                setName(dt.filename)
                setSize(`${(dt.filesize/1024).toFixed(2)} KB`)
                setDlink(`${config.server}${dt.download}`)
        }
        detail()
        const handleDownload= ()=>{
                // e.preventDefault()
                const aTag=document.createElement("a");
                aTag.href=downloadLink
                aTag.setAttribute("download",name)
                // aTag.target="_blank"
                aTag.click()
                aTag.remove();
        }
        
    return (
        <>
         <HeaderHome/>
            <div className="w-full h-screen flex justify-center items-center flex-col bg-slate-300"> 
                <div className="flex justify-center items-center flex-col p-10 rounded-xl bg-blue-700" >
                <h1 className="text-xl font-bold shadow1 mb-3">You can Download Your file</h1>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Size:</td>
                            <td>{size} </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={"2"} >
                            
        
         <button onClick={handleDownload}  className="text-white mt-3 text-xl font-bold text-shadow-xl text-shadow-black outline-none bg-orange-700 px-3 py-2 rounded-xl">Downlod</button></td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                </div>
            </div>
        </>
    )
  }
  export default Download;