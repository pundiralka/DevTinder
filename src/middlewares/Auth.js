const jwt = require('jsonwebtoken');
const User = require("../model/user");
const userAuth = async(req,res,next)=>{
try{
  const {token} = req.cookies;
  if(!token){
    throw new Error("token is invalid!!!!!");
  }
  const decodeMessage = await jwt.verify(token,"dev@tinder$#13",{ expiresIn: '1h' });
  const {_id}= decodeMessage;
  const user = await User.findById(_id);
  req.user =user;
  if(!user){
    throw new Error("user is not found");
  }
  next();
}catch(error){
  res.status(400).send("Error: "+ error.message)

}
}
module.exports = {
    userAuth
}