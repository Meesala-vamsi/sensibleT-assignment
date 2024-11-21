import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthLayout from "./components/AuthLayout.jsx";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "./pages/Transaction/index.jsx";
import DashboardLayout from "./pages/dashboardLayout/index.jsx";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice/index.js";

function App() {
  const {isAuthenticated,user,isLoading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

    useEffect(() => {
      const token = JSON.parse(sessionStorage.getItem("token"));
      dispatch(checkAuth(token));
    }, [dispatch]);

    if (isLoading) {
      return (
        <div className="absolute inset-0 bottom-1/2 flex items-center justify-center min-h-screen">
          <div className="loader border-t-transparent border-4 border-gray-400 rounded-full w-9 h-9 animate-spin"></div>
        </div>
      );
    }
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}></ProtectedRoute>
          }
        />
        <Route
          path="auth/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Transaction />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
