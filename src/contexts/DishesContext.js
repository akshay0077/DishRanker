import React, { createContext, useState } from 'react';

// Create dishes context
export const DishesContext = createContext();

// Dishes provider component
export const DishProvider = ({ children }) => {
    // State to store user selections
    const [userSelections, setUserSelections] = useState([]);

    // Provide the dishes context with user selections and setUserSelections function
    return (
        <DishesContext.Provider value={{ userSelections, setUserSelections }}>
            {children}
        </DishesContext.Provider>
    );
};
