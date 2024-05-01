import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Users } from "../models/UserModule.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs"
import path from "path"
import nodemailer from 'nodemailer'

const options = {
   
    httpOnly:true,
    secure:true,
    maxAge:3600000,
   sameSite: 'None'
}

async function mailer(recieveremail, filesenderemail) {
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: "shivamsinghyadavssy888@gmail.com",
          pass: process.env.PASS
      }
  })

  let info = await transporter.sendMail({
      from: "Team ShareItNow",
      to: recieveremail,
      subject: "new file",
      text: "You recieved a new file from " + filesenderemail,
      html: "<b>You recieved a new file from  " + filesenderemail + "</b>",

  })

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

  const fileUpload= asyncHandler(async(req,res)=>{
    // console.log(req.file);
    const uploadPath = req.file?.path;
    const fileLocalPath = path.join(__dirname, uploadPath);

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
         fs.unlinkSync(fileLocalPath)
          throw new ApiError(400, "Sender email is not registered")
      }

  
      if (!recieveruser) {

         fs.unlinkSync(fileLocalPath)

          throw new ApiError(400, "Reciever email is not registered")
      }

      console.log(receiveremail)
      if (senderuser.email === receiveremail) {
        fs.unlinkSync(fileLocalPath)

          throw new ApiError(400, "Reciever Email cannot be same as sender")
      }


      const file = await uploadOnCloudinary(fileLocalPath)
      console.log(file);
      senderuser.files.push({
          senderemail: senderuser.email,
          receiveremail: receiveremail,
          // fileurl: req.file.path,
          fileurl: file.url,
          fileType: file.format,
          filename: file.original_filename ? file.original_filename : new Date().toLocaleDateString(),
          sharedAt: Date.now()
      })

      recieveruser.files.push({
          senderemail: senderuser.email,
          receiveremail: receiveremail,
          // fileurl: req.file.path,
          fileurl: file.url,
          fileType: file.format,
          filename: file.original_filename ? file.original_filename : new Date().toLocaleDateString(),
          sharedAt: Date.now()
      })
      
      await senderuser.save();
      await recieveruser.save();
      await mailer(receiveremail, senderuser.email);
      console.log(file);
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

  export {
    fileUpload,
    getFiles
  } ;
