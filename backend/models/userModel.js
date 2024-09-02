import mongoose,{Schema} from "mongoose";

const userModel = new Schema({
    firstName : {require : true, type : String},
    lastName : {require : true, type : String},
    userName : {require : true, type : String, unique : true},
    password : {require : true, type : String},
    email : {require : true, type : String, unique : true},
    todoList : {type : Schema.Types.ObjectId, ref: "Todo"}

},{timestamps: true})

export const User = mongoose.model("User", userModel)