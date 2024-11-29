import { transporter } from "./Email.confiq.js";
import { Verification_Email_Template, Welcome_Email_Template, Forgot_Password_Email_Template, Success_Forgot_Password_Email_Template } from "./EmailTemplate.js";


export const sendVerificationEamil=async(email,verificationCode)=>{
    try {
           await transporter.sendMail({
            from: '"SacredSecret" <tushu0912@gmail.com>',

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        //console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
export const senWelcomeEmail=async(email,name)=>{
    try {
           await transporter.sendMail({
            from: '"SacredSecret" <tushu0912@gmail.com>',

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name)
        })
        //console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}


export const senForgotPasswordEmail=async(email, fullName, otp)=>{
    try {
        await transporter.sendMail({
         from: '"SacredSecret" <tushu0912@gmail.com>',
         to: email, // list of receivers
         subject: "Forgot your password", // Subject line
         text: "Forgot your password", // plain text body
         html: Forgot_Password_Email_Template.replace("{otpCode}",otp).replace("{name}",fullName), 
     })
        //console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}


export const sendSuccessForgotPasswordEmail=async(email ,fullName)=>{
    try {
        await transporter.sendMail({
         from: '"SacredSecret" <tushu0912@gmail.com>',
         to: email, // list of receivers
         subject: "Succefully Reset Password", // Subject line
         text: "Succefully Reset Password", // plain text body
         html: Success_Forgot_Password_Email_Template.replace("{name}",fullName), 
     })
        //console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}




