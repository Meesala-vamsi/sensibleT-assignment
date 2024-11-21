const Users = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

//RESOURCE ACCESS
exports.resourceAccess=(req,res,next)=>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    const error = new CustomError("Token not found", 401);
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
    if (error) {
      const error = new CustomError("Invalid token", 400);
      return next(error);
    } else {
      const user = await Users.findById(data.id);
      req.user = user;
      next();
    }
  });
}

//GENERATING JWT
const generateToken=(data)=>{
  const jwtToken = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:"600m"})
  return jwtToken;
}

//CREATE USER 
exports.registerUser = asyncHandler(async(req,res,next)=>{
  const {username,email,password} = req.body;
  const checkUser = await Users.findOne({email});
  if(checkUser){
    const error = new CustomError("User already exists.Please login");
    return next(error);
  }

  const user = await Users.create(req.body);

  res.status(201).json({
    status:"success",
    message:"Account created successfully."
  });
})

//LOGIN USER
exports.loginUser = asyncHandler(async(req,res,next)=>{
  const {email,password} = req.body;

  const user = await Users.findOne({email}).select("+password");

  if(!user){
    const error = new CustomError("User not found. Please register.");
    return next(error);
  }

  if(!(await user.comparePasswords(user.password,password))){
    const error = new CustomError("Invalid password",400);
    return next(error);
  }

  const token = generateToken({
    username:user.username,
    email:user.email,
    id:user._id
  })
  res.status(200).json({
    status:"success",
    token,
    message:"Logged In successfully..",
    data:{
      username:user.username,
      email:user.email,
      id:user._id
    }
  })
});

//LOGOUT USER
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.status(200).clearCookie("token").json({
    status: "success",
    message: "Logout successfully.",
  });
});

