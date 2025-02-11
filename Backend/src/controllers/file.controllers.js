import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {cloudinary, deleteFileFromCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js"
import { Users } from "../models/UserModule.models.js"
import files from "../models/File.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs"
import path from "path"
import { mailer } from "../utils/Mailer.js";
const options = {
   
    httpOnly:true,
    secure:true,
    maxAge:3600000,
   sameSite: 'None'
}

// async function mailer(recieveremail, filesenderemail) {
//   let transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//           user: "shivamsinghyadavssy888@gmail.com",
//           pass: process.env.PASS
//       }
//   })

//   let info = await transporter.sendMail({
//       from: "Team ShareItNow",
//       to: recieveremail,
//       subject: "new file",
//       text: "You recieved a new file from " + filesenderemail,
//       html: "<b>You recieved a new file from  " + filesenderemail + "</b>",

//   })

//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// }

  const fileUpload= asyncHandler(async(req,res)=>{
    // console.log(req.file);
    const fileLocalPath = req.file;
    // const temporary= path.resolve(fileLocalPath)
    // console.log(temporary);
    if(!fileLocalPath){
       throw new ApiError(400, "Please upload a valid file");
    }
   

      const receiveremail  = req.body.email;
      // console.log( receiveremail, filename, filekey, fileType)
      console.log(req.body);
      // console.log("reciever",receiveremail);
      let senderuser = await Users.findOne({ _id: req.user._id });
      let recieveruser = await Users.findOne({ email: receiveremail });
      if (!senderuser) {
         deleteFileFromCloudinary(req.file.path)
          throw new ApiError(400, "Sender email is not registered")
      }

  
      if (!recieveruser) {

         deleteFileFromCloudinary(req.file.path)

          throw new ApiError(400, "Reciever email is not registered")
      }

      console.log(receiveremail)
      if (senderuser.email === receiveremail) {
          deleteFileFromCloudinary(req.file.path)

          throw new ApiError(400, "Reciever Email cannot be same as sender")
      }

      
      
        const file = await cloudinary.api.resource(req.file.filename)
        console.log("cloudinary upload error",file);
        senderuser.files.push({
          senderemail: senderuser.email,
          receiveremail: receiveremail,
          fileId:file?.public_id,
          fileurl: file?.secure_url,
          filename: file.original_filename ? file.original_filename : new Date().toLocaleDateString(),
          sharedAt: Date.now(),
          fileType: file.format,
        })

        recieveruser.files.push({
          senderemail: senderuser.email,
          receiveremail: receiveremail,
          fileId:file?.public_id,
          fileurl: file?.secure_url,
          fileType: file.format,
          filename: file.original_filename ? file.original_filename : new Date().toLocaleDateString(),
          sharedAt: Date.now()
        })
        
        await senderuser.save();
        await recieveruser.save();
        await mailer(receiveremail, senderuser.email,`${process.env.frontend_url}/myfile`);
        // console.log(file);
        return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {
              file: file.original_filename
            },
            "file uploaded successfully"
          )
          
        )
      
  })

  const  getFiles= asyncHandler(async(req,res)=>{
    let user = await Users.findById(req.user._id)
    if(!user){
      return res.status(401)
      .json(new ApiResponse(401,"User not found","Invalid User"))
    }
    return res.status(200)
    .json( new ApiResponse(200,user.files,"successfully fetch"))
  })


  
  const sendWithoutSignIn=asyncHandler(async(req,res)=>{
    const filePath=req.file
    // const tempPath=path.resolve(filePath)
    if(!filePath){
      throw new ApiError(400, "Please upload a valid file");
   }
   try {
    
     const data=req.body
    //  console.log(data)
     const file = await cloudinary.api.resource(req.file.filename)
    //  console.log(file)
     const dbFile= await files.create({
       uuid:uuidv4(),
       senderemail:data.senderEmail,
       name:data.name,
       receiveremail: data.recieverEmail,
       fileId:file?.public_id,
       fileurl: file?.secure_url,
       fileType: file.format,
       filename: file.original_filename ? file.original_filename : new Date().toLocaleDateString(),
       sharedAt: Date.now(),
       message:data.message  
     })
     if(dbFile){
      console.log(dbFile);
      
      return res.status(200)
      .json( new ApiResponse(200,dbFile,"Shared File Successfully"))
     }
   } catch (error) {
    console.log(`Something went wrong while Uploadig`,error);
    throw new ApiError(500,"Something went wrong while uploading the file",)
   }

  })

  const getFileInfo=asyncHandler(async (req,res)=>{
    const {uuid}=req.params
    // console.log("this is uuid",uuid);
    
    if (!uuid) {
      throw new ApiError(400, "Please provide a valid uuid");
    }
    try {
      const file=await files.findOne({uuid})
      if(file){
        return res.status(200)
        .json(new ApiResponse(200,file,"File Info"))
    }
    return res.status(404).json(new ApiResponse(404,"File Not Found"))
  }
    catch (error){
      console.log(error)
      throw new ApiError(500,"Something went wrong while fetching the file info",)
    }
  })
  export {
    fileUpload,
    getFiles,
    sendWithoutSignIn,
    getFileInfo
  } ;
