import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import { responseList } from "../config/responseList.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config()

export const userSignup = async (req, res) => {
    try{
        const {username, password} = req.body

        if(!username || !password) {
            return res.status(400).json({Message : "All fields is required"})
        }
        const existUser = await User.findOne({username})
        if(existUser){
            return res.status(409).json({Message : responseList.USER_EXISTED})
        }
        console.log(username)
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userData = {
            ...req.body,
            password : hashedPassword
        }
        const user = new User(userData)
        await user.save()
        const token = jwt.sign({user_id : user._id}, process.env.SECRET_PHASE)
        return res.status(201).json({"Message" : responseList.CREATED_SUCCESS, token, username})

    }catch(e){
        console.log(e)
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
}

export const userLogin = async (req, res) => {
    const {username} = req.body
    const user = await User.findOne({ username })
    if(!user){
        return res.status(404).json({"Message" : responseList.USER_NOT_FOUND})
    }
    try{
        const compare = await bcrypt.compare (req.body.password, user.password)
        if(!compare){
            return res.status(400).json({"Message" : responseList.USER_PASSWORD_ERROR})
        }
        const token = jwt.sign({user_id : user._id}, process.env.SECRET_PHASE)
        res.status(200).json({token,username})
    }catch(e){
        console.log(e)
        return res.status(400).json({"Message" : responseList.BAD_REQUEST})
    }
}