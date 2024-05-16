import React, { useContext } from "react";
import { DishesContext } from "../contexts/DishesContext";
import { useNavigate } from "react-router-dom";

const UserPollPage = () => {
  const { userSelections } = useContext(DishesContext);
  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userSelections");
    localStorage.removeItem("username");

   navigate("/");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
      <h1 className="text-3xl font-semibold mb-6">Your Poll Results</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 h-10 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        Logout
      </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dish Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rank
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userSelections.map((selection, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {selection.dishName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rank {selection.rank}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {selection.points} points
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPollPage;
