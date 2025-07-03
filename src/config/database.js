const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://pundiralka:Hkjy8ZFGwOWdP4uX@projectnode.yj6bdqb.mongodb.net/devTinder");

}
module.exports = connectDB;
