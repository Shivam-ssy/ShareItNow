import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import express from "express";
import Files from "./src//models/File.models.js";
import connectDB from "./src/db/Db.js";
import path from "path";
const port=process.env.PORT || 3000
import { app } from "./src/app.js";




//Database connection and starting the server

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.get("/",(req,res)=>{
    res.send("HELLO THIS IS SHIVAM ")
   
    
})


// //creating a local storage to save the file ready to upload 
// let storage=multer.diskStorage({
//     destination:(req,file,cb)=>cb(null,"uploads/"),
//     filename:(req,file,cb)=>{
//         const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
//         cb(null,uniqueName)
//     }
// })

// let upload=multer({
//     storage,
//     limit:{filesize:1000000*200}
// },).single('file');
//Route for file sharing 
// app.post(`${process.env.UPLOAD_URL}`,(req,res)=>{
       
//     upload(req, res, async (err) => {
//         if (err) {
//           return res.status(500).send({ error: err.message });
//         }
//         // console.log(req)
//         if(req.file){
//           const file = new Files({
//               filename: req.file.filename,
//               uuid: uuidv4(),
//               path: req.file.path,
//               size: req.file.size
//           });
//           const response = await file.save();
//           res.json({status:"File Uploaded Successfully", file: `${process.env.BACKEND_URL}/files/${response.uuid}` });
//         }else{
//             res.send({status :"!something went wrong file not recived ?File is greater than 200MB"})
//         }
         
//         });
    
// })



// working on download page  routes 



// app.get(`${process.env.DOWNLOAD_URL}`, async (req,res)=>{
//     try{
        
//         const fl= await Files.findOne({uuid:req.params.uuid})
//         if(!fl){
//             res.send({status:"File not found! Link has been epired"})
//         }
//         res.send({
//             uuid:fl.uuid,
//             filename:fl.filename,
//             filesize:fl.size,
//             download:`${process.env.BACKEND_URL}/files/download/${fl.uuid}`
//         })
//     }catch(err){
//         console.log(err)
//     }
        
// })



//working on download file route 

// app.get(`${process.env.FILE_DOWNLOAD_URL}`, async (req,res)=>{
//     try{
        
//         const fl= await Files.findOne({uuid:req.params.uuid})
//         if(!fl){
//             res.send({status:"File not found! Link has been epired"})
//         }
//         const currentDir = path.dirname("server.js");
       
//         const flPath = path.join(currentDir, '/uploads', fl.filename); 
//         res.download(flPath,fl.filename,(err)=>{
//             if(err)
//             console.log(err)
//         })
     
//     }catch(err){
//         console.log(err)
//     }
        
// })

//grant vismo &n teninit
//incenption ,intesteller
