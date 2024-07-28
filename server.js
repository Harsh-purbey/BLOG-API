import express from "express"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "./MODEL/User.js";

const app = express();
app.use(express.json());

const PORT = 8000;



app.get('/',(req,res) => {
    res.json({
        sucess : true,
        message : "HOME ROUTE"
    })
})

app.post('/api/users/register',async (req,res) => {
    const {name,email,password} = req.body;

    const cheekEmail = await User.findOne({email})

    if(cheekEmail){
        return res.status(409).json({
            message:"USER ALREADY EXIST",
            success:false,
        })
    }

    const passHash = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:passHash})
    const userRes = {
        _id:user._id,
        name:user.name,
        email:user.email,
        createdAt:user.createdAt
    }
    const token = jwt.sign({_id:user._id},'HARSH')

    if(user){
        return res.status(202).cookie('token',token).json({
            message:"USER REGISTERED SUCCESSFULLY",
            user:userRes,
            success:true,
        })
    }
})

mongoose.connect('mongodb+srv://harshpurbey8182:fZQariInFU4hHO2s@blog-db.q6zdwis.mongodb.net/')
    .then(() => {
        console.log("DATABASE CONNECTED SUCESSFULLY");
    })
    .catch((error) => {
        console.log(error);
    })


app.listen(PORT, () => {
    console.log(`SERVER IS LIVE AT PORT ${PORT}`);
})

// harshpurbey8182
// fZQariInFU4hHO2s
//harshpurbey8182:fZQariInFU4hHO2s@blog-db.q6zdwis.mongodb.net/