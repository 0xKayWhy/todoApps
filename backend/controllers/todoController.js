import { Todo } from "../models/seedModel.js";
import { responseList } from "../config/responseList.js";


export const getTodo = async (req, res) => {
    const allTodo = await Todo.find()
    if(!allTodo || allTodo.length === 0) {
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
    return res.status(200).json({allTodo})
}


export const createTodo = async (req, res) => {
    const todo = new Todo({
        ...req.body,
        createdBy : req.user._id
    })
    if(!todo){
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
    await todo.save()
    return res.status(201).json({"Message" : responseList.CREATED_SUCCESS})
}

export const editTodo = async(req, res) => {
    try{
        const todoId = req.params.id
        if(!todoId){
            return res.status(400).json({"Message" : responseList.BAD_REQUEST})
        }
        const updateTodo = await Todo.findByIdAndUpdate(todoId,
        req.body,
        )
        if(!updateTodo){
            return res.status(404).json({"Message" : responseList.NOT_FOUND})
        }
        return res.status(200).json({updateTodo})
    }catch(e){
        console.log(e)
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
}

export const deleteTodo = async(req, res) => {
    try{
        if(!req.params.id ){
            return res.status(400).json({"Message" : responseList.BAD_REQUEST})
        }
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        if(!deleteTodo){
            return res.status(404).json({"Message" : responseList.NOT_FOUND})
        }
        return res.status(204).json({"Message" : responseList.DELETED_SUCCESS})
    }catch(e){
        console.log(e)
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
}