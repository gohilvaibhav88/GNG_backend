import React from "react";
import Footer from "./Footer";
import First from "./One";
import Second from "./Second";
// import Th from "./Third";
import Three from "./Three";

const Main3 = () => {
  return (
    <div className="flex flex-col bg-white h-full w-full gap-8">
      <div className="first">
        <First />
      </div>
      <div className="second">
        <Second />
      </div>
      <div className="third">
        <Three />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Main3;
