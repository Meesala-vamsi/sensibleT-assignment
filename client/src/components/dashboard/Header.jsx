import React from 'react'
import { TbSquareRoundedLetterTFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetTokenAndCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
  const onClickLogout = ()=>{
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
    toast.success("Logged out successfully.");
  }

  return (
    <header className="flex justify-between items-center px-5 py-4">
      <TbSquareRoundedLetterTFilled className="text-3xl text-red-600" />
      <div className='flex gap-9 items-center'>
        <h1 className="text-sm tracking-widest">
          Welcome, <span className='font-bold'>{user?.username}</span>
        </h1>
        <button className='md:px-6 md:py-1 bg-violet-300 md:text-sm text-gray-500 rounded-full outline-none' onClick={onClickLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header