import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderHome({ className }) {
  const isUser = useSelector((state) => state.auth.status);
  const name = useSelector((state) => state.auth.userData);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`flex z-50 justify-between items-center bg-gray-900 px-5 lg:px-10 py-6 md:py-5 ${className}`}>
      <h1 className="font-bold text-3xl md:text-5xl text-white">ShareNest</h1>

      {/* Navigation Menu for Larger Screens */}
      {isUser && (
        <div className="hidden md:flex gap-6 text-white items-center">
          <Link to="/Home" className="cursor-pointer">Home</Link>
          <Link to="/Home/myfile" className="cursor-pointer">My files</Link>
          <Link to="/Home/share/upload" className="cursor-pointer">Upload File</Link>
          <Link to="/Home/profile" className="flex items-center gap-2 font-bold">
            <img width="20px" src="/user-3-fill.svg" alt="User" />
            {name?.name}
          </Link>
        </div>
      )}

      {/* Mobile Menu Toggle Button */}
      {isUser && (
        <button 
          className="block md:hidden cursor-pointer" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img className="w-8" src="/menu-5-fill.svg" alt="Menu" />
        </button>
      )}

      {/* Mobile Navigation Popover */}
      {isUser && isMenuOpen && (
        <div className="absolute top-16 h-screen duration-300 ease-in-out right-0 bg-gray-900 text-white rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
          <Link to="/Home" className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/Home/myfile" className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>My files</Link>
          <Link to="/Home/share/upload" className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>Upload File</Link>
          <Link to="/Home/profile" className="flex items-center gap-2 font-bold cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            <img width="20px" src="/user-3-fill.svg" alt="User" />
            {name?.name}
          </Link>
        </div>
      )}

      {/* Login & Signup Buttons (if not logged in) */}
      {!isUser && (
        <div className="flex gap-5">
          <Link to="/Login">
            <button className="px-4 py-2 rounded-lg hover:scale-105 ease-out hover:bg-[#ce3f21] bg-gray-100 font-bold">Login</button>
          </Link>
          <Link to="/SignUp">
            <button className="px-4 py-2 hidden sm:block rounded-lg hover:scale-105 ease-out bg-[#ce3f21] hover:bg-gray-100 font-bold">SignUp</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HeaderHome;
