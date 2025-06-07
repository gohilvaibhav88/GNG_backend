import g11 from "../Images/g11.png";
import g12 from "../Images/g12.png";
import g13 from "../Images/g13.png";
export default function Three() {
  return (
    <div className="check1 flex gap-8 mt-16 justify-center">
      <div className="check2 gap-4 ">
        {/* Know About Us Section */}
        <h2 className="text-3xl font-bold text-center mb-8">Know About Us!!</h2>

        <div className="flex flex-col items-center ">
          {/* Red Button */}
          <button className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-semibold mb-4">
            How does our model work?
          </button>

          {/* FAQs Section */}
          <div className="text-center text-l  space-y-2 mb-8 font-bold ">
            <p>What payment methods are accepted?</p>
            <p>Can I track my order in real-time?</p>
            <p>Are there any special discounts or promotions available?</p>
          </div>
        </div>
      </div>

      <div className="check3">
        {/* Three-Step Process */}
        <div className="flex flex-wrap justify-center gap-6 mt-24  ">
          {/* Step 1: Place an Order */}
          <div className="w-48 h-64 p-6 bg-white rounded-lg shadow-lg text-center bg-gray-300">
            <img src={g11} alt="Order" className="mx-auto w-20" />
            <h3 className="text-lg font-bold mt-4">Place an Order!</h3>
            <p className="text-gray-600 mt-2 text-sm font-semibold">
              Place order through our website and mention pick-up time.
            </p>
          </div>
          {/* Step 2: Track Progress */}
          <div className="w-48 h-64 p-6 bg-white rounded-lg shadow-lg text-center bg-gray-300">
            <img src={g12} alt="Track Progress" className="mx-auto w-20" />
            <h3 className="text-lg font-bold mt-4">Track Progress</h3>
            <p className="text-gray-600 mt-2 text-sm font-semibold">
              You can track your order status with delivery time.
            </p>
          </div>

          {/* Step 3: Get Your Order */}
          <div className="w-48 h-64 p-6 bg-white rounded-lg shadow-lg text-center bg-gray-300">
            <img src={g13} alt="Get Order" className="mx-auto w-20" />
            <h3 className="text-lg font-bold mt-4">Get your Order!</h3>
            <p className="text-gray-600 mt-2 text-sm font-semibold">
              Visit the respective canteen and collect the order after payment.
            </p>
          </div>
        </div>

        {/* Summary Text */}
        <p className="mt-8 text-gray-700 text-center max-w-2xl ">
          Our model simplifies the food ordering process. Browse through our
          diverse menu, select your favorite dishes, and proceed to checkout.
          Your delicious meal will be ready at your own time.
        </p>
      </div>
    </div>
  );
}
