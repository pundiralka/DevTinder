const validator = require("validator");
const signupValidator = (req)=>{
    const {emailID,password,firstName,lastName} = req;

    if(!validator.isEmail(emailID)){
        throw new Error("Enter the invalid email");

    }else if(!validator.isStrongPassword(password)){
        throw new Error("your password is weak");

    }else if(!firstName || !lastName){
        throw new Error("Name is invalid");

    }
}
module.exports = signupValidator;