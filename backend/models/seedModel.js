import mongoose,{Schema} from "mongoose";

const todoSchema = new Schema ({
    title : {require : true , type : String},
    description : {require : true, type : String},
    createdBy : {type: Schema.Types.ObjectId, ref : "User"},
    editedAt : {type : Date}
},{timestamps : true})

export const Todo = mongoose.model("Todo", todoSchema)