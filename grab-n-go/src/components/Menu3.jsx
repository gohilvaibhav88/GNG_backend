
import foodImage from "../Images/g5.png"; // Replace with your actual image path

const Menu3 = ({ basketItems = [] }) => {
  const subTotal = basketItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const preOrderFee = 12;
  const total = subTotal + preOrderFee;

  return (
    <div className="max-w-sm mx-auto p-4 rounded-lg flex flex-col gap-4">
      {/* Order Time */}
      <div className="bg-orange-500 text-white p-3 rounded-lg flex justify-between items-center border-2 border-gray-500">
        <span className="font-medium">Order Ready in :</span>
        <span className="font-bold bg-yellow-200 text-black px-2 py-1 rounded">
          12:05 pm
        </span>
      </div>

      {/* Basket Header */}
      <div className="bg-green-600 text-white p-4 mt-4 rounded-md flex items-center justify-center gap-2">
        <img src={foodImage} alt="Basket" className="rounded-full h-[40px]" />
        <span className="font-semibold text-xl">My Basket</span>
      </div>

      {/* Items in Basket */}
      <div className="bg-white shadow-md rounded-md mt-2 p-2">
        {basketItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No items in cart</p>
        ) : (
          basketItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.quantity}x
                </span>
                <span className="text-gray-800 font-medium">{item.name}</span>
              </div>
              <span className="text-gray-700 font-semibold">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="mt-3 text-gray-800 text-sm">
        <div className="flex justify-between">
          <span>Sub Total:</span>
          <span className="font-semibold">₹{subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>PreOrder Fee:</span>
          <span className="font-semibold">₹{preOrderFee}</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-red-500 text-white text-lg font-bold py-2 mt-3 text-center rounded-md transition-transform hover:scale-105">
        Total to Pay: ₹{total}
      </div>

      {/* Coupon Field */}
      <div className="mt-3 flex items-center border rounded-lg p-2 gap-2">
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

