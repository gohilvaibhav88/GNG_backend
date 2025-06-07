import React from "react";
import food from "../Images/food.png";

const CanteenSection = () => {
  return (
    <div className="w-full flex justify-center items-center bg-gray-100 py-10">
      <div className="relative w-[90%] md:w-[80%] lg:w-[80%]  rounded-2xl shadow-lg">
        {/* Background Image with Overlay */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={food}
            alt="Canteen"
            className="w-full h-auto object-cover opacity-30 bg-black"
          />
          <div className="absolute inset-0 bg-gray-900/50"></div>
        </div>

        {/* Canteen Details */}
        <div className="absolute top-6 left-6 text-white">
          <p className="text-sm">Mouth-watering dishes served here!!</p>
          <h1 className="text-2xl font-semibold">Nashikar Canteen</h1>
          <div className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mt-2">
            Minimum Order: 12 GBP
          </div>
        </div>

        {/* Rating & Open Status */}
        <div className="absolute bottom-6 left-6 flex items-center space-x-4">
          <div className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">3.4</span>
            <div>
              <p className="text-yellow-500 text-lg">★★★★☆</p>
              <p className="text-sm text-gray-500">1,360 reviews</p>
            </div>
          </div>

          <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
            Open until 3:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenSection;
