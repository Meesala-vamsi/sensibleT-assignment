const express = require("express");
const globalErrorController = require("./controllers/globalErrorController");
const CustomError = require("./utils/customError");
const authRoute = require("./routes/authRoutes");
const transactionRoute = require("./routes/transactionRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use("/api/user",authRoute);
app.use("/api/transaction",transactionRoute);
app.all("*",(req,res,next)=>{
  const error = new CustomError(`Invalid end point ${req.originalUrl}`,404);
  next(error);
});

app.use(globalErrorController);

module.exports = app;