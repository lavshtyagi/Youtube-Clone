import { useState } from "react";
import { Button } from "./Button";

const CATEGORIES = [
  "All", "Music", "Live", "Gaming", "News", "Sports",
  "Movies", "React", "JavaScript", "Podcasts", "Smartphones",
  "Tech", "AI", "Cooking", "Travel", "Science",
];

export const ButtonList = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="flex overflow-x-auto scrollbar-hide px-2 py-2 border-b border-gray-100 sticky top-[57px] bg-white z-40">
      {CATEGORIES.map((name) => (
        <Button
          key={name}
          name={name}
          active={active === name}
          onClick={() => setActive(name)}
        />
      ))}
    </div>
  );
};
