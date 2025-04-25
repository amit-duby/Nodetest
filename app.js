import express from "express";
import dotenv from "dotenv";
dotenv.config();
import DbConnect from "./config/Db.js";
import user from "./routes/userRouter.js";
import organiz from "./routes/organizationRouter.js"
import file from "./routes/fileUploadRouter.js";
import cookieParser from 'cookie-parser';

const app=express();

const Port=5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",user);
app.use("/api/org",organiz);
app.use("/api/file",file)
DbConnect()

app.listen(Port,()=>{
    console.log(`server is runing port number ${Port}`);
})