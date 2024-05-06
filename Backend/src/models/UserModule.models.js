import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const fileSchema = new mongoose.Schema({
    senderemail: {required:true , type:String},
    receiveremail: {required:true , type:String},
    fileId:{required:true,type:String},
    fileurl: {required:true , type:String},
    filename: {required:true , type:String},
    sharedAt: {required:true , type:Date},
    fileType : {type:String}
},{timestamps: true})


const User =new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:
        {
            type : String, 
            required:true, 
            lowercase: true ,
            unique:true
        },
        password:{
            type:String, 
            required:true
        },
        refreshToken: {
            type: String
        },
        files:{
            type : [fileSchema],
            default : []
        }
    },
    
)


User.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
User.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

User.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
User.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const Users=mongoose.model('Users',User)
export {Users}