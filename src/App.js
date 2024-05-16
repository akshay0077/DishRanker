import React from 'react';
import { Routes,Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DishesPage from './pages/DishesPage';
import UserPollPage from './pages/UserPollPage';


function App() {
    
    return (
      <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/dishes' element={<DishesPage />} />
      <Route path='/user-poll' element={<UserPollPage />} />
    </Routes>
    );
}

export default App;
