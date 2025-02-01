import mongoose from "mongoose";
import { initialize } from "../utils/FileRemover.js";
const connectDB= async ()=>{
    try{

        await mongoose.connect(`${process.env.DB_URL}`,)
        .then(()=>{
            console.log ("connection successfull")
            initialize()
        })
        
    }catch(err){
        console.log("Database error while connecting", err)
    }
}

export default connectDB;