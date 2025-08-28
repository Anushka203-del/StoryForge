const asyncHandler = require("../utils/async_handler")
const User = require("../models/users.model")
const jwt = require("jsonwebtoken")
const ApiError = require("../utils/ApiError")


const verifyjwt = asyncHandler( async(req,res,next) => {
    try{
        const token = req.cookies?.access_token    //req is a nested object, so req ke andar cookie obj which has anothr object 
        || req.header("Authorization")?.replace("Bearer ", "");                                           //req.header() is a method
        if(!token){
            throw new ApiError(401, "unauthorized request");
        }
        const decoded_token = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded_token?._id; 
        const user = await User.findById(user_id).select(" -password -refresh_token")
        if(!user){
            throw new ApiError(401, "invalid access token");
        }
        req.user = user;              // adding new key user with value of user,cause req doesnt have user object in it so we modified it.
        next();
    }catch(err){
    throw new ApiError(401, err?.message || "invalid access token")
}
    
})
module.exports = verifyjwt;


