const Transactions = require("../models/transactionModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");


//CREATE TRANSACTION
exports.createTransaction = asyncHandler(async(req,res,next)=>{
  const {amount,transactionType,userId,status} = req.body;
  const transaction = await Transactions.create({
    amount,
    transactionType,
    userId,
    status
  });

  res.status(200).json({
    status:"success",
    message:"Transaction created successfully.",
    data:{
      transaction
    }
  })
})

//FETCH TRANSACTIONS BASED ON USER
exports.fetchUserTransactions = asyncHandler(async(req,res,next)=>{
  const transactions = await Transactions.find({userId:req.params.id});

  res.status(200).json({
    status:"success",
    data:{transactions}
  })
})

//UPDATE TRANSACTION
exports.updateTransactionStatus = asyncHandler(async(req,res,next)=>{
  const checkTransaction = await Transactions.findById(req.params.id);
  if(!checkTransaction){
    const error = new CustomError("Transaction not found.",404);
    return next(error);
  }

  const transaction = await Transactions.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});

  res.status(200).json({
    status:"success",
    message:"Transaction updated successfully.",
    data:{
      transaction
    }
  })
})

//FETCH TRANSCATION DETAILS BASED ON TRANSCACTION ID
exports.fetchTransactionById = asyncHandler(async (req, res, next) => {
  const checkTransaction = await Transactions.findById(req.params.id);
  if (!checkTransaction) {
    const error = new CustomError("Transaction not found.", 404);
    return next(error);
  }


  res.status(200).json({
    status: "success",
    data: {
      transaction:checkTransaction,
    },
  });
});