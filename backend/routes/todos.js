import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getTodo } from "../controllers/todoController.js";
import { authentication } from "../middlewares/authentication.js";

const router = Router()

router.use(authentication)

//get all todos from database
router.get("/", getTodo)

//create new todos
router.post("/", createTodo)

//edit todos
router.put("/:id", editTodo)

//delete todos
router.delete("/:id", deleteTodo)

export default router