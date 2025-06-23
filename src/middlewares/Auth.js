const adminAuth = (req,res,next)=>{
    console.log("hello")
  const token= "xyzjkkl";
  const authData = token === "xyz";
  if(!authData){
    res.status(401).send("unauthorized");   
  }else{
    next();
  }

}
const userAuth = (req,res,next)=>{
  const Authenticate= "xyzgh";
  const authData = Authenticate ==="xyz";
  if(!authData){
    res.status(401).send("unauthorized");   
  }else{
    next();
  }

}
module.exports = {
    adminAuth,
    userAuth
}