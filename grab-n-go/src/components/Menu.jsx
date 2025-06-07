import React, { useState } from "react";
// import { Bars3Icon } from "@heroicons/react/24/solid"; // Using Heroicons instead
import g3 from "../Images/g3.png";
const Menu = () => {
  const [selectedItem, setSelectedItem] = useState("Pizza");

  const menuItems = [
    "Pizza",
    "Veg Thali",
    "Samosa",
    "Vada Pav",
    "Poha",
    "Dal Rice",
  ];

  return (
    <div className="w-full bg-gray-100 rounded-2xl shadow-lg p-4 ">
      <div className="flex items-center space-x-2 mb-4">
        <img src={g3} alt="" className="rounded-full h-[40px]" />
        <h1 className="text-2xl font-semibold text-black">Menu</h1>
      </div>

      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li
            key={item}
            className={`px-4 py-3 rounded-lg font-semibold text-lg cursor-pointer transition ease-in-out duration-300 hover:scale-110 ${
              selectedItem === item
                ? "bg-black text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
