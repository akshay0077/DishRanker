import React, { useContext, useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";

import { DishesContext } from "../contexts/DishesContext";
import { AuthContext } from "../contexts/AuthContext";

const DishCard = ({ dish, onSelect }) => {
  const { userSelections, setUserSelections } = useContext(DishesContext);
  const { user } = useContext(AuthContext);

  const [selectedRank, setSelectedRank] = useState(null);
  const [totalRanksSelected, setTotalRanksSelected] = useState(0);

  useEffect(() => {
    // Count the total number of ranks selected across all dish cards
    const totalRanks = userSelections.reduce((acc, selection) => {
      return acc + (selection.rank ? 1 : 0);
    }, 0);
    setTotalRanksSelected(totalRanks);
  }, [userSelections]);

  const handleSelect = (rank) => {
    try {
      const rankPoints = {
        1: 30,
        2: 20,
        3: 10,
      };

      const isAlreadySelected = userSelections.find(
        (selectedDish) =>
          selectedDish.rank === rank && selectedDish.id === dish.id
      );

      // If the dish is already selected, remove it from the selections
      if (isAlreadySelected) {
        const updatedSelections = userSelections.map((selectedDish) => {
          if (selectedDish.id === dish.id) {
            return { ...selectedDish, rank: null };
          }
          return selectedDish;
        });
        setUserSelections(updatedSelections);
        setSelectedRank(null);
        onSelect(null);
      } else {
        if (totalRanksSelected < 3) {
          const updatedSelections = userSelections.filter(
            (selectedDish) => selectedDish.rank !== rank
          );
          setUserSelections([
            ...updatedSelections,
            { ...dish, rank, username: user.username },
          ]);
          setSelectedRank(rank);
          onSelect({ ...dish, rank, points: rankPoints[rank] });
        } else {
          toast.error("Max Limit is 3 for Selecting Dish");
        }
      }
      return rankPoints[rank];
    } catch (error) {
      // Handle any errors
      toast.error(error.message);
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
            selectedRank === 1 || totalRanksSelected === 3
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={selectedRank !== null && selectedRank !== 1}
        >
          Rank 1
        </button>
        <button
          onClick={() => handleSelect(2)}
          className={`bg-blue-500 text-white px-4 mt-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            selectedRank === 2 || totalRanksSelected === 3
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={selectedRank !== null && selectedRank !== 2}
        >
          Rank 2
        </button>

        <button
          onClick={() => handleSelect(3)}
          className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            selectedRank === 3 || totalRanksSelected === 3
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={selectedRank !== null && selectedRank !== 3}
        >
          Rank 3
        </button>
        <Toaster />
      </div>
    </div>
  );
};

export default DishCard;
