const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Username field is required."]
  },
  email:{
    type:String,
    required:[true,"Email field is required."],
    validate:[
      validator.isEmail,
      "Enter a valid email address."
    ],
    unique:true
  },
  password:{
    type:String,
    select:false,
    required:[true,"Password field is required."]
  }
},{timestamps:true});

userSchema.pre("save",async function(){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePasswords = async function(passDB,pass){
  const checkPass = await bcrypt.compare(pass,passDB);
  return checkPass;
}

const Users = mongoose.model("Users",userSchema);

module.exports = Users;