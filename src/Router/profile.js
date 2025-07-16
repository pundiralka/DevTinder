const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,async(req,res)=>{
   try{
    const {user }= req;
    res.send(user)

   }catch(error){
    res.status(400).send("user: "+ error.message)
   }
})

module.exports = profileRouter;


