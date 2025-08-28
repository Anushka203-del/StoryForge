const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config() //loads all env variables in process.env
const connectDB = async () => {
    try{
        const uri = `${process.env.MONGODB_URI}/?retryWrites=true&w=majority&appName=Cluster0` ;
        const db = await mongoose.connect(uri);
        console.log("databse connected");
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB;


