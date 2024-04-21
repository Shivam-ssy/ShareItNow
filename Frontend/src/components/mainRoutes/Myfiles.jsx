import React, { useState } from "react";
import config from "../../../Conf/cofig";
import { useEffect } from "react";
 function Myfile(){
    const [loader,setloader]= useState(false);
    const [files, setData]=useState([])

    const downloadFile = async (file) => {
        try {
            const url = file.fileurl;
            console.log(file)
            const response = await fetch(url);
            const blob = await response.blob();

            // Create a temporary link element
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = file.filename;
            a.style.display = 'none';

            // Append the link to the body and trigger the download
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
      }


    useEffect(()=>{
              const fetchUser= async ()=>{
                  const fetchData= await fetch(config.getFiles,{
                      method:'GET',
                      credentials:'include',
                  })
                  .then((fetchData)=>fetchData.json())
                  .finally(()=>setloader(false))
                  console.log(fetchData)
                  if(fetchData.statusCode===200){
                          setData(fetchData.data)
        
                  }
              }
              fetchUser();
        
          },[])
          const handleDownload= (downloadLink)=>{
            // e.preventDefault()
            const aTag=document.createElement("a");
            aTag.href=`${downloadLink}?response-content-disposition=attachment`
            aTag.setAttribute("download","")
            // aTag.target="_blank"
            aTag.click()
            aTag.remove();
    }
    return(
        <>
        <div className="w-full mt-20 h-screen flex items-center justify-center"
         style={{
            backgroundImage: `linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)`
        }}>
            <div className=" p-5 min-h-[75vh] border-2 border-solid border-[#ce3f21]">
            <table className="">
        <thead className="bg-white h-10 border-2 border-solid border-black">
          <tr className="">
            <th className="px-3">Filename</th>
            <th className="px-3">File Type</th>
            <th className="px-3">Sender Email</th>
            <th className="px-3">Receiver Email</th>
            <th className="px-3">Shared At</th>
            <th className="px-3">view</th>
            <th className="px-3">Download</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {files.sort((a,b)=>{
            // TODO: sort
            return new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime()
          }).map((file, index) => {
  
            return (
              <tr key={index}>
                <td className="px-3">{file.filename}</td>
                <td className="px-3">
                  {file.fileType}
                </td>

                <td className="px-3">{file.senderemail}</td>
                <td className="px-3">{file.receiveremail}</td>
                <td className="px-3">{new Date(file.sharedAt).toLocaleString()}</td>
                <td>
                  <button onClick={()=>{handleDownload(file.fileurl)}} >   <img className="w-10 " src="/eye-line.svg" alt="" /></button>
                </td>
                <td>
                  <button onClick={()=>{downloadFile(file)}} className="" >   <img className="w-10 " src="/file-download-line.svg" alt="" /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
            </div>
        </div>
        </>
    )
 }
 export default Myfile;