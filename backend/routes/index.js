const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account');
router.get('/',(req,res)=>{
    res.send("Hello World");
})
router.use('/user',userRouter);
router.use('/account',accountRouter);
module.exports = router;