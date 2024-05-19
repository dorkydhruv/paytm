const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');
const User = require('./db').User;

const authMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json({
            message: "Unauthorized",
        })
    }
    const token = authHeader.split(" ")[1];
    try{
        decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.id;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}

module.exports =authMiddleware;