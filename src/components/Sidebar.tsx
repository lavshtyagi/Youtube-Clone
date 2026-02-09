
import { useSelector } from "react-redux";

export const Sidebar = () => {
    const isMenuOpen = useSelector((store :RootState) => store.app.isMenuOpen);
    if(!isMenuOpen) return null;
  return (
    <div className="p-5 shadow-lg w-48 h-flex ">
      {/* Top Section */}
      <ul className="mb-4">
        <li className="font-bold cursor-pointer">Home</li>
        <li className="cursor-pointer">Shorts</li>
        <li className="cursor-pointer">Subscriptions</li>
      </ul>

      <hr className="mb-4" />

      {/* Subscriptions */}
      <h1 className="font-bold mb-2">Subscriptions</h1>
      <ul className="mb-4">
        <li>Elite Predators</li>
        <li>Alpha Defense - Hindi</li>
        <li>Zero1 Hindi by Zerodha</li>
        <li>Greg Hogg</li>
        <li>Mohak Mangal</li>
        <li>Arpit Bhayani</li>
        <li>Coder Army</li>
      </ul>

      <hr className="mb-4" />

      {/* You Section */}
      <h1 className="font-bold mb-2">You</h1>
      <ul className="mb-4">
        <li>History</li>
        <li>Playlists</li>
        <li>Watch later</li>
        <li>Liked videos</li>
        <li>Your videos</li>
        <li>Downloads</li>
        <li className="text-sm text-gray-500">Show more</li>
      </ul>

      <hr className="mb-4" />

      {/* Explore */}
      <h1 className="font-bold mb-2">Explore</h1>
      <ul className="mb-4">
        <li>Shopping</li>
        <li>Music</li>
        <li>Movies</li>
      </ul>

      <hr className="mb-4" />

      {/* More from YouTube */}
      <h1 className="font-bold mb-2">More from YouTube</h1>
      <ul className="mb-4">
        <li>YouTube Studio</li>
        <li>YouTube Music</li>
        <li>YouTube Kids</li>
      </ul>

      <hr className="mb-4" />

      {/* Settings */}
      <ul>
        <li>Settings</li>
        <li>Report history</li>
        <li>Help</li>
        <li>Send feedback</li>
      </ul>
    </div>
  );
};
