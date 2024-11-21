import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex justify-center bg-gradient-to-r min-h-screen">
      <div className="flex justify-center items-center md:grid md:grid-cols-4 md:border md:w-[100%] ">
        <div className="col-span-2 h-full overflow-hidden hidden md:block">
          <img
            src="https://res.cloudinary.com/db0f83m76/image/upload/v1732104610/online-banking1_4x_hpkau6.jpg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <main className="bg-gray-50 md:h-full col-span-2 flex flex-col justify-center ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout