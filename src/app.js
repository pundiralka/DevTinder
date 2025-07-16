const express= require("express");
const connectDB = require("./config/database");
const User= require("./model/user");
const app = express();
var cookieParser = require('cookie-parser');
const authRouter = require("./Router/auth");
const profileRouter = require("./Router/profile");
const requestRouter = require("./Router/request");
app.use(express.json());
app.use(cookieParser());

// add data for the user

//login api
app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


//connection request

//GETTING THE LIST OF ALL USER
app.get("/feed",async(req,res)=>{
  const users = await User.find();
  try{
    if(!users){
    res.status(400).send("record is not found")
  }else{
    res.send(users);
  }
  }catch(err){
    res.status(400).send(err.message);

  }
})
//GETTING THE LIST OF GIVEN EMAIL
app.get("/user",async(req,res)=>{
   const email = req.body.emailID;
   try{
    const users = await User.find({emailID: email})
    if(!users){
      res.status(400).send("record is not found");
    }else{
      res.send(users);
    }

   }catch(error){
    res.status(400).send(error.message);

   }
})
//delete the data from the database
app.delete("/user",async(req,res)=>{
  try{
    const userId = req.body.userId;
     await User.findByIdAndDelete(userId);
     res.send("User is successfully deleted from the database")

  }catch(error){
    res.status(400).send(error);
  }

})

//update the user from the database
app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  console.log("updated data",data)
  try{
    const updatedData = ["firstName","lastName","skills","about","photoUrl","userId"]
    const isUpdateAllowed = Object.keys(data).every((k)=> updatedData.includes(k));

    if(!isUpdateAllowed){
      throw new Error("update are not allowed");

    }
    if(data?.skills?.length>10){
      throw new Error("Skills cannot be more than 10");

    }
    await User.findByIdAndUpdate({_id: userId},data,{
      runValidators:true
    });
    res.send("user is sucessfully updated")

  }catch(error){
    res.status(400).send(error.message);
  }

});
connectDB().then(()=>{
    console.log("database is successfully connected")
    app.listen(3000,()=>{
        console.log("server is successfully listening on port 2000")
    });
}).catch((err)=>{
  console.log("database cannot be connected",err)
});



