import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
let name=process.env.CLOUDINARY_CLOUD_NAME
let key=process.env.CLOUDINARY_API_KEY
let secret=process.env.CLOUDINARY_API_SECRET
cloudinary.config({ 
  cloud_name:name,
  api_key:key, 
  api_secret:secret,
  secure:true 
});
console.log(name);
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
         console.log("error on cloudinary upload ", error);
        return "error in uploading";
    }
}




async function deleteFileFromCloudinary(publicId) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Deleted file from Cloudinary:', result);
        return result; // This includes the result of the deletion operation
    } catch (error) {
        console.error('Failed to delete file from Cloudinary:', error);
        throw error;
    }
}


export {uploadOnCloudinary , deleteFileFromCloudinary}