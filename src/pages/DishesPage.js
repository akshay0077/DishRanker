import React, { useState, useEffect } from "react";
import axios from "axios";
import DishCard from "../components/DishCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/dctacademy/react-task/main/db.json`
      );
      const data = response.data;
      const perPage = 6; // Number of dishes per page
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedData = data.slice(startIndex, endIndex);
      setDishes(paginatedData);
      setTotalPages(Math.ceil(data.length / perPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDishSelect = (selectedDish) => {
    setSelectedDishes((prevSelected) => {
      const existingIndex = prevSelected.findIndex(
        (dish) => dish.id === selectedDish.id
      );
      if (existingIndex !== -1) {
        const updatedSelections = [...prevSelected];
        updatedSelections.splice(existingIndex, 1);
        return updatedSelections;
      } else {
        return [...prevSelected, selectedDish];
      }
    });
  };

  const handleContinue = () => {
    localStorage.setItem("userSelections", JSON.stringify([]));
    navigate("/user-poll");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Vote for Your Favorite Dishes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onSelect={handleDishSelect} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <button
        onClick={handleContinue}
        className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          selectedDishes.length === 3 ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={selectedDishes.length !== 3}
      >
        Continue
      </button>
    </div>
  );
};

export default DishesPage;
