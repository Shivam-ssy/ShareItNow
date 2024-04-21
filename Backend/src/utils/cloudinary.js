import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"

let name=process.env.CLOUDINARY_CLOUD_NAME;
let key=process.env.CLOUDINARY_API_KEY
let secret=process.env.CLOUDINARY_API_SECRET
cloudinary.config({ 
  cloud_name:name,
  api_key:key, 
  api_secret:secret,
  secure:true 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("cloudinary file :", localFilePath);
        // if (localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file response");
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
         // remove the locally saved temporary file as the upload operation got failed
         console.log(error);
        return "error in uploading";
    }
}



export {uploadOnCloudinary}