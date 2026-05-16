const jwt = require('jsonwebtoken')
const User = require('../models/User')

export const protect = (req,res, next)=>{
const token = req.cookies.jwt

try{
    const {userId} = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = userId

    User.findById(userId)
    console.log('from auth middleware!!',token)
    next()



}catch(error){
  return res.status(401).json({message: "Invalid or expired token"})
}
}