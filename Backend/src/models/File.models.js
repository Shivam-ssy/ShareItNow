import mongoose from "mongoose";

const fileSchema =new mongoose.Schema(
    {
        filename:{type:String, required:true},
        path:{type:String,required:true},
        size:{type:Number,required:true},
        uuid:{type:String,required:true},
    },{
        timestamps:true
    },
  
)
const files=mongoose.model('Files',fileSchema)
export default files 