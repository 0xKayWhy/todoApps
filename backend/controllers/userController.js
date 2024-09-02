import { Router } from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import { responseList } from "../config/responseList.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config()
const router = Router()

router.post("/register", async (req, res)=> {
    try{
        const existUser = User.find({username : req.body.username})
        if(existUser){
            return res.status(409).json({responseList.})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userData = {
            ...req.body,
            password : hashedPassword
        }
        const user = new User(userData)
        await user.save()
        return res.status(201).json({"Message" : responseList.CREATED_SUCCESS})

    }catch(e){
        console.log(e)
        return res.status(401).json({"Message" : responseList.BAD_REQUEST})
    }
})

router.post("/login", async(req, res)=> {
    const user = await User.findOne({ userName: req.body.userName })
    if(!user){
        return res.status(404).json({"Message" : responseList.USER_NOT_FOUND})
    }
    try{
        const compare = bcrypt.compareSync (req.body.password, user.password)
        if(!compare){
            return res.status(400).json({"Message" : responseList.USER_PASSWORD_ERROR})
        }
        const token = jwt.sign({user_id : user._id}, process.env.SECRET_PHASE)
        res.status(200).json({token})
    }catch(e){
        console.log(e)
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
})


export default router