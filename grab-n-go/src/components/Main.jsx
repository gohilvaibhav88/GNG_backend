import React from "react";


// import CanteenSection from "./CanteenSection";
import Menu from "./Menu";
import Menu2 from "./Menu2";
import Menu3 from "./Menu3";
import g2 from "../Images/g2.png";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <div className="gap-5 bg-white">
      <div className="w-full p-4  flex flex-col gap-8">
        <Navbar />
        <div className="image-section w-full h-[600px] flex  items-center justify-center ">
          <img
            src={g2}
            alt=""
            className="w-[80%] h-[600px] transition ease-in-out duration-300 hover:scale-110"
          />
        </div>
        <div className="flex justify-center w-full">
          <div className="menu-section flex justify-between gap-2 p-4 max-w-[80%] w-full">
            <div className="menu1 text-white p-4 basis-[20%] rounded-lg h-auto flex flex-col">
              <Menu />
            </div>

            <div className="menu2 text-white p-4 basis-[40%]">
              <Menu2 />
            </div>

            <div className="menu3 bg-gray-100 text-white p-4 basis-[20%] rounded-lg">
              <Menu3 />
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;
