import { Router } from "express";
import {fileUpload,getFileInfo,getFiles,sendWithoutSignIn } from "../controllers/file.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router()

router.route("/upload").post(verifyJWT,
    upload.single("file"), 
     fileUpload
)
router.route('/files').get(verifyJWT , getFiles ) 
router.route('/sendfile').post(upload.single("file"),sendWithoutSignIn) 
router.route('/getfileinfo/:uuid').get(getFileInfo)

export default router