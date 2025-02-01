
// // Configure Cloudinary
import { cloudinary } from "../utils/cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'], // Allowed formats
  },
});

export const upload = multer({ 
    storage,
    limit:{filesize:1000000*200} 
})
