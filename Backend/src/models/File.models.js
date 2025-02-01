import mongoose from "mongoose";

const  unkfile=new mongoose.Schema(
    {
        uuid:{type:String,required:true},
        senderemail: {required:true , type:String},
        receiveremail: {required:true , type:String},
        name:{required:true,type:String},
        fileId:{required:true,type:String},
        fileurl: {required:true , type:String},
        filename: {required:true , type:String},
        sharedAt: {required:true , type:Date},
        fileType : {type:String},
        message:{type:String}
    },{
        timestamps:true
    },
  
)
const files=mongoose.model('unkfile',unkfile)
export default files 