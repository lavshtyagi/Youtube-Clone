import React from "react";
import menu from "../assets/menu.png";
import { toggleMenu } from "../utils/appslice";
import { useDispatch } from "react-redux";

export const Head: React.FC = () => {
    const dispatch = useDispatch();
    
    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    } 
  return (
    <div className="flex items-center justify-between px-5 py-3 shadow-md">
      
      {/* Left section */}
      <div className="flex items-center gap-4">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-6 cursor-pointer"
          alt="menu"
          src={menu}
        />
        <img
          className="h-6 cursor-pointer"
          alt="YouTube Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
        />
      </div>

      {/* Center search */}
      <div className="flex items-center flex-1 justify-center">
        <input
          className="w-1/2 px-4 py-1 border border-gray-400 rounded-l-full focus:outline-none"
          type="text"
          placeholder="Search"
        />
        <button className="px-4 py-1 border border-gray-400 rounded-r-full bg-gray-100">
          🔍
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center">
        <img
          className="h-8 rounded-full cursor-pointer"
          alt="user icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58xgID2kKLNcPm1kCdBRAI_UZo1WY7tJtnA&s"
        />
      </div>

    </div>
  );
};
