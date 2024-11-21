import React from 'react'
import Header from '../../components/dashboard/Header'
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 flex-grow p-3">{<Outlet />}</div>
    </div>
  );
}

export default DashboardLayout