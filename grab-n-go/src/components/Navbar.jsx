import React from "react";
import profileIcon from "../Images/profileIcon.png";
import g from "../Images/g.png";
const Navbar = () => {
  return (
    <div className="p-4">
      <div className="Navbar flex flex-row items-center justify-between w-full p-2 text-white bg-white rounded-lg ">
        <div className="image ">
          {" "}
          <img src={g} alt="" className="rounded-full h-[20px]" />
        </div>

        <div className="search w-[50%]">
          <input
            type="text"
            placeholder="Search for canteen, cusinine or dish "
            className="w-full w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-black"
          />
        </div>
        <div className="profile flex gap-4 justify-center items-center">
          {" "}
          <img src={profileIcon} alt="" className="rounded-full h-[30px]" />
          <h4 className="text-black ">John Doe</h4>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
