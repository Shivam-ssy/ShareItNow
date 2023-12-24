import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Users from "./models/UserModule.js"
import Files from "./models/File.js";
import { config} from "dotenv";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import  Jwt  from "jsonwebtoken";
import session from "express-session";
import cookieParser from "cookie-parser";
const port=process.env.PORT || 3000
config()  //config is used to config the dot env variable in our server.js files 
const app=express()

app.use(cors({
    origin:"https://share-it-now-8sn5.vercel.app",
    credentials:true
})); //cors are used for the cross url connection communication eg: server are running at -3000 and frontend at 5173
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECREATE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
}))
//Database connection 
;(
    async ()=>{
        await mongoose.connect(process.env.DB_URL,).then(()=>{
            console.log ("connection successfull")
        }).catch((error)=>{
            console.log(error)
        })
    }
)()

app.get("/",(req,res)=>{
    res.send("HELLO THIS IS SHIVAM ")
   
    
})






//Routes for Login and register
app.post(`${process.env.REGISTER_URL}`, async (req,res)=>{
    //  console.log(req.body);
    try{
       const signData =await Users.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        console.log(signData)
       res.json({status:true,data:signData})
       
    }catch(err){
        console.log(err)
        res.json({status:false})
        
    }
})


app.post(`${process.env.LOGIN_URL}`, async (req,res)=>{
    console.log(req.body);
   const user= await Users.findOne({
    email:req.body.email,
   });
   if(user){
    if(user.password == req.body.password){
        req.session.userSession={name:user.name};
        res.cookie('sessionId', req.sessionID, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true,sameSite:'none' ,secure:true ,path:'/'});
        res.send({status:true, user:true }) 
    }
    else
   {
    return res.send({status:true, user:false})
   }
      
   }
   else
   {
    return res.send({status:true, user:false})
   }

   
})


//Routes for the home page of the user 
app.get(`${process.env.USER_HOME}`,(req,res)=>{
  
    if(!req.session.userSession){
        return res.send({status:true , user:false})
     }
      res.send({
        status:true, user:true,userdata:req.session.userSession 
      })
    });
//working on files routes 


//creating a local storage to save the file ready to upload 
let storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
})

let upload=multer({
    storage,
    limit:{filesize:1000000*200}
},).single('file');
//Route for file sharing 
app.post(`${process.env.UPLOAD_URL}`,(req,res)=>{
       
    upload(req, res, async (err) => {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        // console.log(req)
        if(req.file){
          const file = new Files({
              filename: req.file.filename,
              uuid: uuidv4(),
              path: req.file.path,
              size: req.file.size
          });
          const response = await file.save();
          res.json({status:"File Uploaded Successfully", file: `/files/${response.uuid}` });
        }else{
            res.send({status :"!something went wrong file not recived ?File is greater than 200MB"})
        }
         
        });
    
})



// working on download page  routes 

app.use(express.static('public'));

app.get(`${process.env.DOWNLOAD_URL}`, async (req,res)=>{
    try{
        
        const fl= await Files.findOne({uuid:req.params.uuid})
        if(!fl){
            res.send({status:"File not found! Link has been epired"})
        }
        res.send({
            uuid:fl.uuid,
            filename:fl.filename,
            filesize:fl.size,
            download:`/files/download/${fl.uuid}`
        })
    }catch(err){
        console.log(err)
    }
        
})



//working on download file route 

app.get(`${process.env.FILE_DOWNLOAD_URL}`, async (req,res)=>{
    try{
        
        const fl= await Files.findOne({uuid:req.params.uuid})
        if(!fl){
            res.send({status:"File not found! Link has been epired"})
        }
        const currentDir = path.dirname("server.js");
       
        const flPath = path.join(currentDir, '/uploads', fl.filename); 
        res.download(flPath,fl.filename,(err)=>{
            if(err)
            console.log(err)
        })
     
    }catch(err){
        console.log(err)
    }
        
})
app.listen(port,()=>{
    console.log("app listining at 3000");
})
//grant vismo &n teninit
//incenption ,intesteller
