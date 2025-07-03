const express= require("express");
const connectDB = require("./config/database");
const User= require("./model/user");
const app = express();


app.use(express.json());
// add data for the user
app.post("/signup",async(req,res)=>{
    //creating new instance in the User model
   const user = new User(req.body);
   try {
    await user.save();
    res.send("user data is sucessfully added!!")
    
   } catch (error) {
     res.status(400).send("error saving the user"+error?.message);
    
   }
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
  const updateData = req.body;
  try{
    await User.findByIdAndUpdate({_id: userId},updateData);
    res.send("user is sucessfully updated")

  }catch(error){
    res.status(400).send(error);
  }


})


connectDB().then(()=>{
    console.log("database is successfully connected")
    app.listen(3000,()=>{
        console.log("server is successfully listening on port 2000")
    });
}).catch((err)=>{
  console.log("database cannot be connected")
});



