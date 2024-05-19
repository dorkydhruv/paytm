const express = require("express");
const router = express.Router();
const yup = require("yup");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");


router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        to: req.userId,
    });
    res.json({
        balance: account.balance,
    })
})


router.post("/deposit",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;
    const account = await Account.findOne({
        userId:req.userId,
    }).session(session);
    const toAccount = await Account.findOne({
        userId:to,
    }).session(session);
    if(!toAccount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "Invalid account",
        })
    }
    if(account.balance<amount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "Insufficient balance",
        })
    }
    await Account.updateOne({
        userId:req.userId,
    },
    {
        $inc:{
            balance:-amount,
        }
    }).session(session);
    await Account.updateOne({
        userId:req.to,
    },
    {
        $inc:{
            balance:amount,
        }
    }).session(session);
    await session.commitTransaction();
    res.json({
        message: "Amount deposited successfully",
    })
})

module.exports = router;