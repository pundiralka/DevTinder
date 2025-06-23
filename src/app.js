const express= require("express");
const {adminAuth,userAuth}= require("./middlewares/Auth")
const app = express();
// this will match all the http method api calls to test
// app.use("/test",(req,res)=>{
//     res.send("dev tinder project");
// })
// this will handle get call to user

// DYNAMIC ROUTE
// app.get('/abc/:userId/:name',(req,res)=>{
//     console.log(req.params);
//     res.send({"firstname": "alka", "lastname":"pundir"})
// });

// app.get("/user",(req,res)=>{
//     res.send({"firstname": "alka", "lastname":"pundir"})
// });
// app.post("/user",(req,res)=>{
//     res.send("data is successfully saved in db")
// });
// app.delete("/user",(req,res)=>{
//     res.send("data is successfuly deleted")
// });

//Multiple route handlers - play with the code
// app.use("/route",(req,res,next)=>{
//     console.log("route handler 1")
//         next();
//     //res.send("response 1 !!")

// },[(req,res,next)=>{
//     console.log("route handler 2")
//     next();
//     //res.send("response 2 !!")
// },(req,res,next)=>{
//     console.log("route handler 3")
//     //res.send("response 3 !!")
//     next();
// },(req,res,next)=>{
//     console.log("route handler 4")
//     res.send("response 4 !!")
//     next();
   // There is no third middleware, so next() goes nowhere.
//Express just silently drops the next() and finishes the request.
//}])
// app.use("/route",(req,res,next)=>{
//     console.log("route handler 2")
//     next();
//     //res.send("response 2 !!")
// })
// app.use("/route",(req,res,next)=>{
//     console.log("route handler 3")
//     //res.send("response 3 !!")
//     next();
// })
// app.use("/route",(req,res,next)=>{
//     console.log("route handler 4")
//     res.send("response 4 !!")
//     next();
// })

//middleware authentication


// app.use("/admin",adminAuth)
// app.get("/admin/userdata",(req,res,next)=>{
    
//     res.send("data is successfully send")
// })
// app.get("/admin/userdelete",(req,res,next)=>{
    
//     res.send("data is successfully send1")
// })

// error handling
app.get("/user/data",( req, res)=>{
    try{
       throw new error("xyz");
       res.send("data");

    }catch(err){
        res.status(500).send("contact to our support team")

    }
})
app.use("/",(err,req,res,next)=>{
    if(err){
    res.status(500).send("something went wrong");

    }})

app.listen("3000");