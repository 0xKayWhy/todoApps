import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import usersRoutes from "./routes/users.js"
import todosRoutes from "./routes/todos.js"


const server = express()

dotenv.config()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended : true}))

server.use("/api/user",usersRoutes)
server.use("/api/todos", todosRoutes)

mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log("MongoDB connected")
})

const port = process.env.PORT

server.listen(port, ()=> {
    console.log(`Running on ${port}`)
})