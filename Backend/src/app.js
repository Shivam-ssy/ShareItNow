import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
const app = express()

const origin= process.env.frontend_url || "http://localhost:5173";
app.use(cors({
  origin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials:true,
})); 
const tempPath=path.resolve("./uploads")
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static(tempPath));
app.use(cookieParser())



//routes import
import userRouter from './routes/user.routes.js'
import fileRouter from "./routes/files.routes.js"
//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/files", fileRouter)

// http://localhost:8000/api/v1/users/register


export { app }

