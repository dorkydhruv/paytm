const express = require("express");
const router = express.Router();
const yup = require("yup");
const jwt = require("jsonwebtoken");   
const authMiddleware = require("../middleware");
const {User} = require("../db");
const JWT_SECRET = require("../config");
const signUpSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
})
router.post("/signup", async(req,res)=>{
    const body = req.body;
    try{
        await signUpSchema.validate(body);
    }catch(err){
        return res.status(411).json({
            message: err.message,
        });
    }
    const user = User.findOne({
        username:body.username,
    })
    if(user._id){
        return res.status(411).json({
            message: "Email already taken",
        });
    }
    const dbUser = await User.create(body);
    const token = jwt.sign({
        id:dbUser._id,
    },JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token,
    })
})


const updateBody = yup.object().shape({
    password: yup.string().optional(),
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
})

router.put("/",authMiddleware,async(req,res)=>{
    try{
        await updateBody.validate(req.body);
    }catch(err){
        return res.status(411).json({
            message: err.message,
        });
    }
    await User.updateOne({
        _id:req.userId,
    },req.body);
    res.json({
        message: "User updated successfully",
    })
})

module.exports = router;