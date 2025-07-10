const mongoose = require("mongoose");
const validator = require("validator");
const { default: isURL } = require("validator/lib/isURL");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4
    },
    lastName:{
        type: String,
    },
    emailID: {
       type: String,
       required: true,
       unique: true,
       lowercase: true, 
       trim: true,
       validate(value){
      const validateEmail=validator.isEmail(value);
      if(!validateEmail){
        throw new Error("Invalid email address " + value)
      }
     }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("this is weak password " + value)
            }
        }
    },
    age:{
        type: Number,
       
    },
    photoUrl:{
        type:String,
        default:"https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=6efc2aa4-6572-4caa-ac22-0f68192dfba8&query=User+Profile",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Provide the valid photo url");
            }

        }

    },
    gender:{
        type: String,
         validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    about:{
        type: String,
        default:"This is default about the user"
    },
    skills:{
        type:[String]
    },
},
{
    timestamps:true
}
);
module.exports = mongoose.model("User",userSchema);