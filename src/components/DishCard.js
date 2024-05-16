import React, { useContext, useState } from "react";
import { DishesContext } from "../contexts/DishesContext";
import { AuthContext } from "../contexts/AuthContext";


const DishCard = ({ dish, onSelect }) => {
  const { userSelections, setUserSelections } = useContext(DishesContext);
  const { user } = useContext(AuthContext);

  const [selectedRank, setSelectedRank] = useState(null);

  const handleSelect = (rank) => {
    const rankPoints = {
      1: 30,
      2: 20,
      3: 10,
    };

    // Check if the dish is already selected
    const isAlreadySelected = userSelections.find(
      (selectedDish) => selectedDish.rank === rank
    );

    // If the dish is already selected, remove it from the selections
    if (isAlreadySelected) {
      const updatedSelections = userSelections.filter(
        (selectedDish) => selectedDish.id !== dish.id
      );
      setUserSelections(updatedSelections);
      setSelectedRank(null);
      onSelect(null); // Deselect the dish
    } else {     
        // Remove any previous selection for the same rank
        const updatedSelections = userSelections.filter(
          (selectedDish) => selectedDish.rank !== rank
        );
        setUserSelections([...updatedSelections, { ...dish, rank, username: user.username }]);
        setSelectedRank(rank);
        onSelect({ ...dish, rank, points: rankPoints[rank] });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <img
        src={dish.image}
        alt={dish.dishName}
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold mb-2">{dish.dishName}</h3>
      <p className="text-gray-600">{dish.description}</p>
      <div className="flex justify-around">
        <button
          onClick={() => handleSelect(1)}
          className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            selectedRank === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedRank !== null && selectedRank !== 1}
        >
          Rank 1
        </button>
        <button
          onClick={() => handleSelect(2)}
          className={`bg-blue-500 text-white px-4 mt-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            selectedRank === 2 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedRank !== null && selectedRank !== 2}
        >
          Rank 2
        </button>

        <button
          onClick={() => handleSelect(3)}
          className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            selectedRank === 3 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedRank !== null && selectedRank !== 3}
        >
          Rank 3
        </button>
      </div>
    </div>
  );
};

export default DishCard;
