const express = require("express");
const router = express.Router();
const yup = require("yup");
const jwt = require("jsonwebtoken");   
const authMiddleware = require("../middleware");
const {User, Account} = require("../db");
const {JWT_SECRET} = require("../config");
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

    await Account.create({
        userId: dbUser._id,
        balance: 1+ Math.random()*1000,
    })

    const token = jwt.sign({
        id:dbUser._id,
    },JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token,
    })
})

const signInSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
})

router.post("/signin",async(req,res)=>{
    try{
        await signInSchema.validate(req.body);
    }catch(err){
        return res.status(411).json({
            message: err.message,
        });
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password,
    })
    if(user){
        const token = jwt.sign({
            id:user._id,
        },JWT_SECRET);
        res.json({
            token: token,
        })
    }
    else{
        res.status(401).json({
            message: "Invalid username or password",
        })
    }
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

router.get("/bulk",authMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[
            {
                firstName:{
                    "$regex": filter,
                }
            },
            {
                lastName:{
                    "$regex": filter,
                }
            },
        ]
    })
    res.json({user: users.map(user=>({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
    }))});
})

module.exports = router;