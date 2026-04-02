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
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    dispatch(setSearchQuery(val.trim()));
    navigate("/");
  };

  const handleLogoClick = () => {
    setInputVal("");
    dispatch(setSearchQuery(""));
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3 shadow-sm">
      {/* Left - hamburger + logo */}
      <div className="flex flex-shrink-0 items-center gap-4">
        <img
          onClick={() => dispatch(toggleMenu())}
          className="h-6 cursor-pointer opacity-80 transition-opacity hover:opacity-100"
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

      {/* Center - search bar */}
      <form
        onSubmit={handleSearch}
        className="mx-6 flex flex-1 items-center max-w-xl"
      >
        <input
          value={inputVal}
          onChange={handleChange}
          className="w-full rounded-l-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none"
          type="text"
          placeholder="Search"
        />
        <button
          type="submit"
          className="border border-l-0 border-gray-300 bg-gray-50 px-5 py-2 text-gray-600 transition-colors hover:bg-gray-100 rounded-r-full"
        >
          🔍
        </button>
        <button
          type="button"
          className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-base transition-colors hover:bg-gray-200"
          title="Search with voice"
        >
          🎤
        </button>
      </form>

      {/* Right - notifications + avatar */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition-colors hover:bg-gray-100">
          🔔
        </button>
        <img
          className="h-8 w-8 cursor-pointer rounded-full object-cover ring-2 ring-gray-200 transition-all hover:ring-blue-400"
          alt="user icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58xgID2kKLNcPm1kCdBRAI_UZo1WY7tJtnA&s"
        />
      </div>
    </div>
  );
};
