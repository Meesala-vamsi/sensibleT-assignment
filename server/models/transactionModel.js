const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount:{
    type:Number,
    required:[true,"Amount field is required."]
  },
  transactionType:{
    type:String,
    required:[true,"Transaction field is required."]
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:[true,"User is required."]
  },
  status:{
    type:String,
    enum:["PENDING","COMPLETED","FAILED"],
    required:[true,"Status field is required."],
    default:"COMPLETED"
  }
},{timestamps:true});

const Transactions = mongoose.model("Transactions",transactionSchema);

module.exports = Transactions;