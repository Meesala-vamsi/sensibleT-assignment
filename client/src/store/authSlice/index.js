import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CgAlignBottom } from "react-icons/cg";
const initialState={
  token:null,
  user:null,
  isAuthenticated:false,
  isLoading:true
}

export const registerUser = createAsyncThunk("/auth/registerUser",
  async(formData,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/user/register`,formData);
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data)
    }
  }
);

export const loginUser = createAsyncThunk("/auth/loginUser",
  async(formData,{rejectWithValue})=>{
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/login`,
        formData
      );
      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (rejectWithValue) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/logout`,
        {}
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/user/auth-check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
          }
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.user = action.payload?.data),
          (state.isLoading = false),
          (state.isAuthenticated = true),
          (state.token = action.payload?.token),
          sessionStorage.setItem(
            "token",
            JSON.stringify(action.payload?.token)
          ),
          localStorage.setItem("transactionUser", JSON.stringify(action.payload.data));
      })
      .addCase(loginUser.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.user),
          (state.isAuthenticated = true);
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false),
          (state.token = null);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      });
  },
});

export const { resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;


