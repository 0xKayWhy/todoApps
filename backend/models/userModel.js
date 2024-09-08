import mongoose,{Schema} from "mongoose";

const userModel = new Schema({
    username : {required : true, type : String, unique : true},
    password : {required : true, type : String},
    todoList : {type : Schema.Types.ObjectId, ref: "Todo"}

},{timestamps: true})

export const User = mongoose.model("User", userModel)