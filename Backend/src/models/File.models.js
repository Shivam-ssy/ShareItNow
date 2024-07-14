import mongoose from "mongoose";

const fileSchema =new mongoose.Schema(
    {
        uuid:{type:String,required:true},
        filename:{type:String, required:true},
        url:{type:String,required:true},
        size:{type:Number,required:true},
        senderEmail:{type:String,required:true},
        recieverEmail:{type:String,required:true},
        message:{type:String}
    },{
        timestamps:true
    },
  
)
const files=mongoose.model('Files',fileSchema)
export default files 