import { Router } from "express";
import {fileUpload,getFiles } from "../controllers/file.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router()

router.route("/upload").post(verifyJWT,
    upload.single("file"),
        
     fileUpload
)
router.route('/files').get(verifyJWT , getFiles )  
export default router;