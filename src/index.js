import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DishProvider } from './contexts/DishesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <DishProvider>
      <Router>
        <App />
      </Router>
      </DishProvider>
    </AuthProvider>
);
