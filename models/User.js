import mongoose from "mongoose";

const userShcema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
       
    },
    // lastName:{
    //     type:String,
    //     required:true,
       
    // },
    email:{
        type:String,
        required:true,
        unique:true
    },
    country:{
        type:String,
        required:true,
       
    },
    phone: {type: Number, require : true},
    password:{
        type:String,
        required:true,
       
    }, 
    otp: { type: String },  // OTP field
    otpExpire: { type: Date },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verficationToken:String,
    verficationTokenExpiresAt:Date,
    
},{timestamps:true})

export const Usermodel=mongoose.model('User',userShcema)