import { Todo } from "../models/seedModel.js";
import { responseList } from "../config/responseList.js";

//get all todos for the user
export const getTodo = async (req, res) => {
    //sort by new to old
    const allTodo = await Todo.find({createdBy : req.user._id}).sort({updatedAt: -1})
    if(!allTodo || allTodo.length === 0) {
        return res.status(200).json({"Message" : "No todo found"})
    }
    return res.status(200).json(allTodo)
}

//create new todo
export const createTodo = async (req, res) => {
    const {title, description} = req.body

    if(!description || !title) {
        return res.status(400).json({Message : responseList.ALL_FIELD_REQUIRED})
    }

    const todo = new Todo({
        ...req.body,
        createdBy : req.user._id
    })
    
    if(!todo){
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
    await todo.save()
    return res.status(201).json({"Message" : responseList.CREATED_SUCCESS, todo})
}


//edit specific todo
export const editTodo = async(req, res) => {
    try{
        const todoId = req.params.id
        if(!todoId){
            return res.status(400).json({"Message" : responseList.BAD_REQUEST})
        }
        const {title, description} = req.body
        if(!title || !description) {
            return res.status(400).json({Message : responseList.ALL_FIELD_REQUIRED})
        }
        const updateTodo = await Todo.findByIdAndUpdate(todoId,
        req.body,
        { new: true, runValidators: true}
        )
        if(!updateTodo){
            return res.status(404).json({"Message" : responseList.NOT_FOUND})
        }
        return res.status(200).json(updateTodo)
    }catch(e){
        console.log(e)
        return res.status(500).json({"Message" : responseList.BAD_REQUEST})
    }
}

//delete todo
export const deleteTodo = async(req, res) => {
    try{
        if(!req.params.id ){
            return res.status(400).json({"Message" : responseList.BAD_REQUEST})
        }
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        if(!deleteTodo){
            return res.status(404).json({"Message" : responseList.NOT_FOUND})
        }
        return res.status(204).send()
    }catch(e){
        console.log(e)
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
}