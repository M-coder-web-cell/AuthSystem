import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { UserRouter } from "./routes/UserRoutes.js"
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true,
}));

const mainURL= "/api/Auth"
app.use(`${mainURL}`, UserRouter)

export {app}