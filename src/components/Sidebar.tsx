import { useSelector } from "react-redux";
import type { RootState } from "../utils/types";

export const Sidebar = () => {
  const isMenuOpen = useSelector((store: RootState) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div className="sticky top-[57px] self-start h-[calc(100vh-57px)] overflow-y-auto p-5 shadow-lg w-48 flex flex-col scrollbar-hide">
      {/* Top Section */}
      <ul className="mb-4 space-y-1">
        <li className="flex items-center gap-3 font-bold cursor-pointer px-2 py-1.5 rounded-lg bg-gray-100">🏠 Home</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">▶ Shorts</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">📺 Subscriptions</li>
      </ul>

      <hr className="mb-4" />

      {/* You Section */}
      <h1 className="font-bold mb-2 text-sm text-gray-700">You</h1>
      <ul className="mb-4 space-y-1 text-sm">
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">🕑 History</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">📋 Playlists</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">⏰ Watch later</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">👍 Liked videos</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">🎬 Your videos</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">⬇ Downloads</li>
      </ul>

      <hr className="mb-4" />

      {/* Subscriptions */}
      <h1 className="font-bold mb-2 text-sm text-gray-700">Subscriptions</h1>
      <ul className="mb-4 space-y-1 text-sm">
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">👤 Greg Hogg</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">👤 Arpit Bhayani</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">👤 Coder Army</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">👤 Mohak Mangal</li>
      </ul>

      <hr className="mb-4" />

      {/* Explore */}
      <h1 className="font-bold mb-2 text-sm text-gray-700">Explore</h1>
      <ul className="mb-4 space-y-1 text-sm">
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">🛍 Shopping</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">🎵 Music</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">🎬 Movies</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">📰 News</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">⚽ Sports</li>
      </ul>

      <hr className="mb-4" />

      {/* Settings */}
      <ul className="space-y-1 text-sm">
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">⚙ Settings</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">🚩 Report history</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">❓ Help</li>
        <li className="flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100">💬 Send feedback</li>
      </ul>
    </div>
  );
};
