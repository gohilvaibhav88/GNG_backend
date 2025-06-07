import { useState } from "react";
import { useNavigate } from "react-router-dom";
import g7 from "../Images/g7.png";
import g6 from "../Images/g6.png";

export default function CanteenList() {
  const navigate = useNavigate();
  const [clickedId, setClickedId] = useState(null);

  const canteens = [
    {
      id: 1,
      name: "Nashikar Canteen",
      image: g6,
      cuisine: "South Indian, Veg thali...",
      rating: 4.5,
      ratingType: "positive",
    },
    {
      id: 2,
      name: "DYPIMER Canteen",
      image: g7,
      cuisine: "South Indian, Veg thali...",
      rating: 3.0,
      ratingType: "neutral",
    },
    {
      id: 3,
      name: "DYPCOE Cafeteria",
      image: g6,
      cuisine: "South Indian, Veg thali...",
      rating: 4.5,
      ratingType: "positive",
    },
    {
      id: 4,
      name: "Nashikar Canteen",
      image: g7,
      cuisine: "South Indian, Veg thali...",
      rating: 2.0,
      ratingType: "negative",
    },
    {
      id: 5,
      name: "DYPCOE Cafeteria",
      image: g6,
      cuisine: "South Indian, Veg thali...",
      rating: 4.5,
      ratingType: "positive",
    },
    {
      id: 6,
      name: "DYPCOE Cafeteria",
      image: g7,
      cuisine: "South Indian, Veg thali...",
      rating: 4.5,
      ratingType: "positive",
    },
  ];

  const handleClick = (canteen) => {
    setClickedId(canteen.id);

    // Delay navigation to allow animation
    setTimeout(() => {
      if (canteen.name === "Nashikar Canteen") {
        navigate("/canteeninside");
      }
    }, 400);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-12">
        {canteens.map((canteen) => (
          <div
            key={canteen.id}
            className={`bg-white rounded-lg p-4 shadow-md hover:shadow-2xl 
              transition-transform duration-300 ease-in-out cursor-pointer 
              ${
                clickedId === canteen.id
                  ? "scale-110 shadow-xl"
                  : "hover:scale-105"
              }`}
            onClick={() => handleClick(canteen)}
          >
            <img
              src={canteen.image}
              alt={canteen.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex mt-8 justify-between">
              <div className="upper">
                <h2 className="text-lg font-semibold ml-6">{canteen.name}</h2>
                <p className="text-gray-600 ml-6">{canteen.cuisine}</p>
              </div>
              <div className="flex items-center mr-4">
                <span
                  className={`text-white text-sm px-2 py-1 rounded-full ${
                    canteen.ratingType === "positive"
                      ? "bg-green-500"
                      : canteen.ratingType === "neutral"
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                >
                  {canteen.rating}★
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
