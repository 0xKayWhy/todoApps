import { Router } from "express";
import {userSignup, userLogin} from "../controllers/userController.js"


const router = Router()

//signup route
router.post("/signup", userSignup)

//login route
router.post("/login", userLogin)

export default router
