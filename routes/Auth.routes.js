import express from 'express'
import { Reigster, VerfiyEmail, loginUser,logOut,getUser, forgotPassword, verifyOtp} from '../controllers/Auth.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { addBankingCredential, getCredentials, updateCredentials, deleteCredentials } from '../controllers/Credentials.js'
const AuthRoutes=express.Router()


AuthRoutes.post('/register',Reigster)
AuthRoutes.post('/verifyEmail',VerfiyEmail)
AuthRoutes.post('/login-user', loginUser)
AuthRoutes.post('/logout',logOut)
AuthRoutes.get('/getuser',  isAuthenticated,getUser)
AuthRoutes.post('/forgotPassword', forgotPassword)
AuthRoutes.post('/verify-otp',verifyOtp)

AuthRoutes.post('/banking',isAuthenticated, addBankingCredential)
AuthRoutes.get('/credentials/:type' ,isAuthenticated, getCredentials)
AuthRoutes.put('/credentials/:id', isAuthenticated, updateCredentials)
AuthRoutes.delete('/credentials/:id', isAuthenticated, deleteCredentials)
export default AuthRoutes