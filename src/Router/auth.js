const express = require("express");
const signupValidator = require("../utils/validation");
const bcrypt= require("bcryptjs");
const User= require("../model/user");
const authRouter = express.Router();
const validator = require("validator");

authRouter.post("/signup",async(req,res)=>{
   try {
    //validate the data
    signupValidator(req.body);
    // encrypt the password
    const {password,firstName,lastName,emailID} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    
   //creating new instance in the User model
   const user = new User({
      firstName,
      lastName,
      emailID,
      password: hashPassword,
    });
    await user.save();
    res.send("user data is sucessfully added!!")
    
   } catch (error) {
     res.status(400).send("user: "+error?.message);
    
   }
})

authRouter.post("/login", async(req, res)=>{
  try{
    const {emailID, password}= req.body;
    if(!validator.isEmail(emailID)){
      throw new Error("Invalid emailId")
    }
    const user = await User.findOne({emailID: emailID});
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const passwordExist= await user.isPasswordValid(password);
    if(passwordExist){

      //create a JWT token
      const token = await user.getJWT();
      res.cookie("token",token,{
      expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
     });

      //Add token to the cookie and send the response back to the user
      res.send("user login sucessfully");
    }else{
      throw new Error("Invalid Credential")
    }
  }catch(error){
    res.status(400).send("user: "+error?.message);
  };
})

module.exports = authRouter;