import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleMenu, setSearchQuery } from "../utils/appslice";
import menu from "../assets/menu.png";

export const Head: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // still allows Enter key to work
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    dispatch(setSearchQuery(val.trim())); // fires on every keystroke → debounced in VedioContainer
    navigate("/");
  };

  const handleLogoClick = () => {
    setInputVal("");
    dispatch(setSearchQuery(""));
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-white shadow-sm border-b border-gray-200">

      {/* Left — hamburger + logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <img
          onClick={() => dispatch(toggleMenu())}
          className="h-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          alt="menu"
          src={menu}
        />
        <img
          onClick={handleLogoClick}
          className="h-5 cursor-pointer"
          alt="YouTube Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
        />
      </div>

      {/* Center — search bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center flex-1 max-w-xl mx-6"
      >
        <input
          value={inputVal}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full text-sm focus:outline-none focus:border-blue-400"
          type="text"
          placeholder="Search"
        />
        <button
          type="submit"
          className="px-5 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
        >
          🔍
        </button>
        <button
          type="button"
          className="ml-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-base"
          title="Search with voice"
        >
          🎤
        </button>
      </form>

      {/* Right — notifications + avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-xl">
          🔔
        </button>
        <img
          className="h-8 w-8 rounded-full cursor-pointer ring-2 ring-gray-200 hover:ring-blue-400 transition-all object-cover"
          alt="user icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58xgID2kKLNcPm1kCdBRAI_UZo1WY7tJtnA&s"
        />
      </div>
    </div>
  );
};
