const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const requestRouter = express.Router();

requestRouter.get("/connectionRequest",userAuth,async(req,res)=>{
  try{
    res.send("connection request is setup now")

  }catch(error){
    res.status(400).send(error.message);
  }

})
module.exports = requestRouter;