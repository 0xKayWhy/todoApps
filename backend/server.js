import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import todoController from "./controllers/todoController.js"
import userController from "./controllers/userController.js"


const server = express()

dotenv.config()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended : true}))

server.use("/user",userController)
server.use("/todo", todoController)

mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log("MongoDB connected")
})

const port = process.env.PORT

server.listen(port, ()=> {
    console.log(`Running on ${port}`)
})