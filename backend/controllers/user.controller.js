const User = require("../models/users.model")
const asyncHandler = require("../utils/async_handler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const jwt = require("jsonwebtoken")

const generateAccessRefreshToken = async(user_id) => {
    try{
    const user = await User.findById(user_id)
    const access_token = await user.generate_access_token()
    const refresh_token = await user.generate_refresh_token()
    user.refresh_token = refresh_token;       
    user.save()
    return { access_token, refresh_token } 
    }catch(error){
        throw new ApiError(500, error.message);
    }
    
}


const register = asyncHandler(  async(req,res) => {
    console.log(req.body);
    const {
        display_name,
        wallet_address,
        email,
        password,
    } = req.body;

    //if(display_name == "" || wallet_address == "" || email == "" || password == "") {
     //   throw new ApiError( 400,"name is missing")
    //}
    if ([display_name,wallet_address,email, password].some(field => field?.trim() === "")){
        throw new ApiError( 400,"data is missing")
    };

    const user = await User.findOne({
        $or : [{email} , {wallet_address}]
    });
    console.log(user);

    if (user){
        throw new ApiError(409, "user with this email or wallet address already exists")   
    }
    const new_user = await User.create({  display_name, wallet_address, email, password })
    const created_user = await User.findById(new_user._id).select("-password") 
    if (!created_user){
        throw new ApiError(500, "internal server error");
    } 
    const response = new ApiResponse(201, created_user , "user successfully registered" );
    return res.status(201).json(response);

}  )  

const login = asyncHandler (  async(req,res) => {
    const {email, password} =  req.body;
    if(!email || !password){
        throw new ApiError(400, "both email and password is required");
    }
    console.log(req.body);
    const user = await User.findOne({email}).select(' -refresh_token');
    if(!user){
        throw new ApiError(404, "user not found");
    }
    const is_password_correct = await user.validate_password(password);
    if(!is_password_correct){
        throw new ApiError(401, "wrong user credentials");
    }
        //to filter and return objecct
    const { access_token, refresh_token } = await generateAccessRefreshToken(user._id)
    // user
    const give_response = new ApiResponse(200, {
        user: user,
        access_token : access_token,
        refresh_token : refresh_token,

    },
    message =  " successfully logged in"
    
  )
  const cookie_options = {
    httpOnly: true,                  //for not letting anyone changes this from frontend
    secure: true,
    
  }
  return res.status(200)
  .cookie("access_token",access_token, cookie_options )
  .cookie("refresh_token",refresh_token,cookie_options)
  .json(give_response)
})


const logout = asyncHandler ( async(req,res) => {
   await User.findByIdAndUpdate(req.user._id,
    { $unset : { refresh_token: 1} },
     { new:true})   //by default findbyidand update returns doc before updating by setting new - true, it will return doc after updating
    const cookie_options = {
    httpOnly: true,                  //for not letting anyone changes this from frontend
    secure: true,
    
  }
    const give_response = new ApiResponse(200,{}, "logged out successfully");
    return res.status(200)
    .clearCookie("access_token",cookie_options)
    .clearCookie("refresh_token",cookie_options)
    .json(give_response);
    
    
})

const generateNewAccessToken = asyncHandler(async (req,res) =>{
    const incomingRefreshToken = req.cookie?.refresh_token || req.body.refresh_token;
    if(!incomingRefreshToken){
        throw new ApiError(400, "missing parameter refresh_token");
    }
    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
    if(!decodedToken){
        throw new ApiError(400, "invalid refresh_token");
    }
    const user_id = decodedToken._id;

    const user = await User.findById(user_id);
    if(user.refresh_token !== incomingRefreshToken){
        throw new ApiError(400,"invalid or expired refresh token");
    }
    const {access_token,refresh_token } = await generateAccessRefreshToken(user_id);

    const options = {
        httpOnly: true,
        secure: true,
    }
    res.status(200)
    .cookie("access_token",access_token,options)
    .cookie("refresh_token",refresh_token,options)
    .json(new ApiResponse(200, {
        access_token: access_token,
        refresh_token: refresh_token
    },
    "new refresh token and access token generated"
))
}
)
 
const change_password = asyncHandler( async(req,res) => {
    const {email,password,new_password} = req.body;
    const user = await User.findOne({email});
    const is_password_right = await user.validate_password(password);
    if (!is_password_right){
        throw new ApiError(401,"password is incorrect")
    }   
    
    user.password = new_password;
    await user.save();

    const response = new ApiResponse(200,{},message = "password successfully changed");
    return res.status(200).json(response);
    }
    
)























module.exports = {register,login,logout,generateNewAccessToken,change_password}


