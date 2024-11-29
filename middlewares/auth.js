import catchAsyncErrors from './catchAsyncErrors.js'
import jwt from 'jsonwebtoken'

export const isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;
    //console.log(token);
    if(!token){
        return res.status(401).json({success:false, message:"Please login to continue"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    //console.log(req.user);
    next();
});

