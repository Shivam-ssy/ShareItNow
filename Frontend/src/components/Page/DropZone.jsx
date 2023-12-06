import React, { useState,useRef,useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import config from "../../../Conf/cofig";

 function Drop({onDrop, accept}){
    const [acceptedLink,setacceptedLink]=useState("");
    const { getRootProps, getInputProps, isDragActive,isDragReject,acceptedFiles,rejectedFiles} = useDropzone({
        onDrop:(acceptedFile)=>handleDrop(acceptedFile),
        accept,
        minSize:0,
        maxSize:209715200
      });
      const copyRef = useRef(null)
      const maxSize = 209715200; 
      const isFileTooLarge = rejectedFiles && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
      const copyToClipboard=useCallback(()=>{
        copyRef.current?.select()
        window.navigator.clipboard.writeText(acceptedLink)
    },[acceptedLink])
    async  function handleDrop(acceptedFile) {
      console.log("Uploaded files:", acceptedFile);
      if(acceptedFile){
        if(acceptedFile.length > 1){
        
          alert("More than (1) file ")
        }
        else{
          const formData = new FormData();
          formData.append('file',acceptedFile[0]);
    
          const UploadUrlData= await fetch(config.uploadUrl,{
            method: 'POST',
            body: formData,
    
          }).then((res)=>res.json())
          alert(UploadUrlData.status)
         const temp= await fetch(UploadUrlData.file).then((res)=>res.json())
         setacceptedLink(`${config.downloadPage}/${temp.uuid}`)
          console.log(UploadUrlData)
        }
      }
      
      
    }
        return (
          <>
          <div className="w-full h-5/6 md:h-screen flex md:flex-row flex-col justify-around items-center">
          <div className="dropbox shadow-xl shadow-slate-300 rounded-3xl p-7" >
          <div className="w-98  flex flex-col justify-center items-center p-5 gap-2 h-80 relative border-dashed border-2 border-slate-900  rounded-3xl" {...getRootProps()}>
                    <img className="h-3/4" src="/file.png" alt="" draggable="false"/>
                    <input type="file" name="file" id="fileInput" {...getInputProps} style={{display:"none"}} />
                    <div className="text-center">
                  {isDragActive ? (
                 <p className="dropzone-content">Release to drop the files here</p>
                     ) : ( <p className="dropzone-content">
                 Drag and drop files here, or click to select files
                 </p>
        )}
        {
            isDragReject && "Cant accept the file"
          }
          {isFileTooLarge && (
          <div className="text-danger mt-2">
            File is too large.
          </div>
        )}
      </div>
      </div>
              </div>
        
      
        <div className=" bg-blue-200  shadow-xl shadow-slate-300 rounded-3xl p-5 ">
        <input  
              value={acceptedLink}
              className="outline-none w-56 h-10 p-2 rounded-l-xl" 
              type="text" 
              readOnly
              placeholder='copy' 
              ref={copyRef}/>
              <button className='text-white font-bold bg-blue-700 h-10 px-4 py-1 rounded-r-xl'
              onClick={copyToClipboard}>Copy</button>
                  </div>
                  </div>
          </>
      )
 }
 export default Drop;