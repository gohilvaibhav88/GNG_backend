import React, { useState } from "react";
import foodImage from "../Images/g4.png"; // Replace with your actual image path

const menuItems = [
  { name: "Pizza", description: "Mouth Watering Pizza" },
  { name: "Veg Thali", description: "Delicious Veg Thali" },
  { name: "Samosa", description: "Crispy & Tasty Samosa" },
  { name: "Vada Pav", description: "Mumbai’s favorite snack" },
  { name: "Poha", description: "Healthy & Light Breakfast" },
];

const Menu2 = () => {
  const [quantities, setQuantities] = useState(
    menuItems.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );

  const increaseQuantity = (item) => {
    setQuantities((prev) => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const decreaseQuantity = (item) => {
    if (quantities[item] > 0) {
      setQuantities((prev) => ({ ...prev, [item]: prev[item] - 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 
                     rounded-lg p-4 flex justify-between items-center 
                     animate-fadeIn transform hover:scale-105"
        >
          <div>
            <p className="font-bold text-black text-2xl">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.description}</p>
            <div className="flex items-center mt-2">
              {quantities[item.name] > 0 && (
                <>
                  <button
                    className="bg-red-500 text-white rounded-full w-7 h-7 flex justify-center items-center 
                               transition-transform active:scale-90"
                    onClick={() => decreaseQuantity(item.name)}
                  >
                    -
                  </button>
                  <span className="mx-2 font-semibold">
                    {quantities[item.name]}
                  </span>
                </>
              )}
              <button
                className="bg-green-500 text-white rounded-full w-7 h-7 flex justify-center items-center 
                           transition-transform active:scale-90"
                onClick={() => increaseQuantity(item.name)}
              >
                +
              </button>
            </div>
          </div>
          <img
            src={foodImage}
            alt={item.name}
            className="w-20 h-20 rounded-full object-cover 
                       transition-transform duration-300 hover:rotate-6"
          />
        </div>
      ))}
    </div>
  );
};

export default Menu2;
