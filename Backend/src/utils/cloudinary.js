import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"


cloudinary.config({ 
  cloud_name:"shivamssy",
  api_key:"283899533944943", 
  api_secret: "CCLCVLBPtINyFhcFG4Ka54EOaPY",
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