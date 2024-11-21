import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index"
import transactionReducer from "./TransactionSlice/index";

export const store = configureStore({
  reducer:{
    auth:authReducer,
    transactions:transactionReducer
  }
});