const express= require("express");
const app = express();

app.use("/test",(req,res)=>{
    res.send("dev tinder project");
})
app.use("/hello",(req,res)=>{
    res.send("helo helo helo helo");
})

app.use((req,res)=>{
    res.send("hello from the server");
})




app.listen("3000");