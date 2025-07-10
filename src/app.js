const express= require("express");
const connectDB = require("./config/database");
const User= require("./model/user");
const signupValidator = require("./utils/validation");
const app = express();
const bcrypt= require("bcryptjs");
const validator = require("validator");
app.use(express.json());
// add data for the user
app.post("/signup",async(req,res)=>{
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
//login api
app.post("/login", async(req, res)=>{
  try{
    const {emailID, password}= req.body;
    if(!validator.isEmail(emailID)){
      throw new Error("Invalid emailId")
    }
    const user = await User.findOne({emailID: emailID});
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const passwordExist= await bcrypt.compare(password,user.password);
    if(passwordExist){
      res.send("user login sucessfully");
    }else{
      throw new Error("Invalid Credential")
    }
  }catch(error){
    res.status(400).send("user: "+error?.message);
  };
})
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



