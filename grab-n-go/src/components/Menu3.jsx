import React from "react";
// import { Trash2 } from "lucide-react"; // For delete icon
import foodImage from "../Images/g5.png"; // Replace with your actual image path
const Menu3 = () => {
  const basketItems = [
    { name: "Aloo Paratha", quantity: 1, price: 50 },
    { name: "Samosa", quantity: 2, price: 40 },
    { name: "Veg Thali", quantity: 1, price: 60 },
  ];

  const subTotal = basketItems.reduce((acc, item) => acc + item.price, 0);
  const preOrderFee = 12;
  const total = subTotal + preOrderFee;

  return (
    <div className="max-w-sm mx-auto p-4 rounded-lg  flex flex-col gap-4">
      <div className="bg-orange-500 text-white p-3 rounded-lg flex justify-between items-center border-2 border-gray-500">
        <span className="font-medium">Order Ready in :</span>
        <span className="font-bold bg-yellow-200 text-black px-2 py-1 rounded">
          12:05 pm
        </span>
      </div>

      <div className="bg-green-600 text-white p-4 mt-4 rounded-md flex items-center gap-2 items-center justify-center">
        <img src={foodImage} alt="" className="rounded-full h-[40px]" />
        <span className="font-semibold text-xl">My Basket</span>
      </div>

      <div className="bg-white shadow-md rounded-md mt-2 p-2">
        {basketItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {item.quantity}x
              </span>
              <span className="text-gray-800">{item.name}</span>
            </div>
            <button className="text-gray-400 hover:text-red-500">
              {/* <Trash2 size={16} /> */}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 text-gray-800 text-sm">
        <div className="flex justify-between">
          <span>Sub Total:</span>{" "}
          <span className="font-semibold">Rs. {subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>PreOrder Fee:</span>{" "}
          <span className="font-semibold">Rs. {preOrderFee}</span>
        </div>
      </div>

      <div className="bg-red-500 text-white text-lg font-bold py-2 mt-3 text-center rounded-md transition ease-in-out duration-300 hover:scale-110">
        Total to pay: Rs. {total}
      </div>

      <div className="mt-3 flex items-center border rounded-lg  p-2 gap-2">
        <input
          type="text"
          placeholder="Apply Coupon Code here"
          className="flex-1 outline-none text-sm px-2 rounded-lg"
        />
        <button className="bg-green-500 text-white px-3 py-1 rounded-md">
          ➡️
        </button>
      </div>
    </div>
  );
};

export default Menu3;
