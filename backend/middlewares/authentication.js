import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { responseList } from "../config/responseList.js"
import { User } from "../models/userModel.js"

dotenv.config()

//check on protected route whenever user request for additional action
export const authentication = async (req, res, next) => {
    
    
    try{
        //get token from client side and decode
        const bearerToken = req.headers.authorization
        if(!bearerToken){
            return res.status(401).json({"Message" : responseList.NO_TOKEN})
        }
        const token = bearerToken.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_PHASE)
        
        if(!decodedToken){
            return res.status(401).json({"Message" : responseList.INVALID_TOKEN})
        }
        req.user = await User.findById(decodedToken.user_id)
        next()
    }catch(e){
        return res.status(400).json({"Message" : responseList.SOMETHING_WRONG})
    }
}