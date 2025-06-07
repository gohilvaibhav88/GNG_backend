import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CanteenList from "./CanteenList";
const Main2 = () => {
  return (
    <div className="bg-white  h-full w-full flex flex-col gap-4">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="middle p-10">
        <CanteenList />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Main2;
