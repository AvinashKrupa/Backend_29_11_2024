import express from 'express'
import dotenv from 'dotenv'
import AuthRoutes from './routes/Auth.routes.js'
import DbCon from './libs/db.js'
import cors  from 'cors'
import cookieParser from 'cookie-parser'
import notificationRoutes from "./routes/notificationRoutes.js";
import "./notificationScheduler.js"; // Import scheduler to start it
dotenv.config()
const PORT= process.env.PORT
const app=express()
DbCon()
app.use(cors({
    origin: 'http://localhost:5173', // Match your frontend's origin EXACTLY
    credentials: true // Allow cookies to be sent and received
  }));
app.use("/notifications", notificationRoutes);
// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 
app.use('/auth',AuthRoutes)
app.listen(PORT,()=>{
    console.log(`App is running on Port ${PORT}`)
})