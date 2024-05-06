import multer from "multer";
import path from "path"
const tempPath=path.resolve("./uploads")
console.log(tempPath)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempPath)
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage,
    limit:{filesize:1000000*200} 
})