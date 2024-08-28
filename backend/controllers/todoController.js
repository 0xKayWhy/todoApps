import { Router } from "express";
import { Todo } from "../models/seedModel.js";
import { responseList } from "../config/responseList.js";

const router = Router()

router.get("/", (req, res)=> {
    
})

router.post("/create", async (req, res)=> {
    const todo = new Todo(req.body)
    if(!todo){
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
    await todo.save()
    return res.status(201).json({"Message" : responseList.CREATED_SUCCESS})
})

export default router