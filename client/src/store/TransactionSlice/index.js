import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading:true,
  transactionData:[],
  transactionDetails:{}
}

export const createTransaction = createAsyncThunk("/createTransaction",
  async(formData,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/transaction/create`,formData
      );
      return response?.data
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchTransactionsByUser = createAsyncThunk("/fetchTransactionsByUser",
  async(id,{rejectWithValue})=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/transaction/${id}`);
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateTransactionStatus = createAsyncThunk("/updateStatus",
  async({id,status},{rejectWithValue})=>{
    try{
      const response = await axios.patch(`${import.meta.env.VITE_URL}/api/transaction/update/${id}`,{status});
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
)

export const fetchTransactionDetails = createAsyncThunk("/fetchTransactionDetails",
  async(id,{rejectWithValue})=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/transaction/single/${id}`);
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTransactionsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionData = action?.payload?.data;
      })
      .addCase(fetchTransactionsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.transactionData = null;
      })
      .addCase(fetchTransactionDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionDetails = action?.payload?.data?.transaction;
      })
      .addCase(fetchTransactionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.transactionDetails = null;
      });
  },
});

export default transactionSlice.reducer;