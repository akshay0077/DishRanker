import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import DishesPage from "./pages/DishesPage";
import UserPollPage from "./pages/UserPollPage";
import NotFoundPage from "./pages/NotFoundPage";

import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {user ? (
        <Route path="/admin" element={<AdminPage />} />
      ) : (
        <Route path="*" element={<NotFoundPage />} />
      )}

      <Route path="/dishes" element={<DishesPage />} />
      <Route path="/user-poll" element={<UserPollPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
