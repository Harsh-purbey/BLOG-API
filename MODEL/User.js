import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    createdAt:{
        type:String,
        default:new Date().toLocaleDateString(),
    }
})

const User = mongoose.model('User',userSchema);
export default User;