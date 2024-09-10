import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import usersRoutes from "./routes/users.js"
import todosRoutes from "./routes/todos.js"
import path from "path"
import { fileURLToPath } from "url"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express()

dotenv.config()

server.use(cors())
server.use(express.static(path.join(__dirname, "build")))
server.use(express.json())
server.use(express.urlencoded({extended : true}))

server.use("/api/v1/user",usersRoutes)
server.use("/api/v1/todos", todosRoutes)

mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log("MongoDB connected")
})

const port = process.env.PORT

//open file for views
server.get("/*", (req,res) =>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
} )

server.listen(port, ()=> {
    console.log(`Running on ${port}`)
})