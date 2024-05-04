import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import config from "../../../Conf/cofig";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Drop({ onDrop, accept }) {
  const [acceptedLink, setacceptedLink] = useState("");
  const [recEmail, setRecEmail]= useState("")
  const [file,setfile]=useState(null)
  const [progress, setProgress] = useState(0);
  console.log(recEmail)
  useEffect(()=>{
    setProgress(0)
  },[file])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    onDrop: (acceptedFile) => setfile(acceptedFile),
    accept,
    minSize: 0,
    maxSize: 209715200,
  });
  const copyRef = useRef(null);
  const maxSize = 209715200;
  const isFileTooLarge =
    rejectedFiles &&
    rejectedFiles.length > 0 &&
    rejectedFiles[0].size > maxSize;
  const copyToClipboard = useCallback(() => {
    copyRef.current?.select();
    window.navigator.clipboard.writeText(acceptedLink);
  }, [acceptedLink]);
  async function handleSubmit(e) {
    e.preventDefault()
   console.log("Uploaded files:", file);
   
    if (file) {
      if (file.length > 1) {
        toast.error("More than (1) file ");
      } else {
        toast.success("Uploading started");
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("email",recEmail)

        // const UploadUrlData = await fetch(config.uploadUrl, {
        //   method: "POST",
        //   credentials:'include',
        //   body: formData,
        // });
         await axios({
          method: 'POST',
          withCredentials:true,
          url: config.uploadUrl,
          data: formData,
          onUploadProgress: (progressEvent) => {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentCompleted);
              
          }
      }).then((res)=>{
        if(res.data.statusCode===200)
        toast.success("File has been Uploaded");
       
      }).catch((error)=>{
        if(error.response.status===400){
          toast.error('Reciever email is either not registered or not found')
        }
        else{
          toast.error("Something went wrong while uploading")
        }
      })
     
      // console.log(UploadUrlData.data.statusCode)
       
      // console.log(progress)
        // const temp = await fetch(UploadUrlData.file).then((res) => res.json());
        // // setacceptedLink(`${config.downloadPage}/${temp.uuid}`);
        // console.log(UploadUrlData);
      }
    }
  }
  return (
    <>
      <ToastContainer className="mt-20" position="top-right" autoClose={5000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="w-full h-5/6 md:h-screen flex md:flex-row flex-col justify-around items-center">
        <div className="dropbox shadow-xl shadow-slate-300 rounded-3xl p-7">
          <div
            className="w-98  flex flex-col justify-center items-center p-5 gap-2 h-80 relative border-dashed border-2 border-slate-900  rounded-3xl"
            {...getRootProps()}
          >
            <img className="h-3/4" src="/file.png" alt="" draggable="false" />
            <input
              type="file"
              name="file"
              id="fileInput"
              {...getInputProps}
              style={{ display: "none" }}
            />
            <div className="text-center">
              {isDragActive ? (
                <p className="dropzone-content">
                  Release to drop the files here
                </p>
              ) : (
                <p className="dropzone-content">
                  Drag and drop files here, or click to select files
                </p>
              )}
              {isDragReject && "Cant accept the file"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </div>
        </div>
      <div className=" bg-blue-200 flex p-5 gap-5 flex-col justify-center items-start">
      {file && <div>Selected file: {file[0]?.name}</div>
      } 
      {
        progress > 1?( <div>Uploading: {progress}%</div>):(<div></div>)
      } 
     
        <div className="flex flex-col gap-2 ">
          <label className="font-bold" htmlFor="email">Receiver Email Address</label>
          <input
           type="email" 
           name="Email" 
           id="email" 
           placeholder="Enter the reciever Email"
           className="outline-none w-56 h-10 p-2 rounded-xl"
           value={recEmail}
           onChange={(e)=>{setRecEmail(e.target.value)}}
           />
           <div className="flex justify-around items-center">
           <input className="bg-[#ce3f21] font-bold py-2 px-2 rounded-lg transition-all ease-out hover:bg-black hover:text-white hover:px-3 cursor-pointer" type="reset" value="Reset" />
           <input onClick={(e)=>{handleSubmit(e)}} className="bg-[#ce3f21] font-bold py-2 px-2 rounded-lg transition-all ease-out hover:bg-black hover:text-white hover:px-3 cursor-pointer" type="submit" value="Upload" />
           </div>
        </div>
        {/* <div className="  shadow-xl shadow-slate-300 rounded-3xl">
          <input
            value={acceptedLink}
            className="outline-none w-56 h-10 p-2 rounded-l-xl"
            type="text"
            readOnly
            placeholder="copy"
            ref={copyRef}
          />
          <button
            className="text-white font-bold bg-blue-700 h-10 px-4 py-1 rounded-r-xl"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div> */}

      </div>
      </div>
    </>
  );
}
export default Drop;
