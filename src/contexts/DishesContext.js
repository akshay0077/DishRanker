import React, { createContext, useState } from 'react';

export const DishesContext = createContext();

export const DishProvider = ({ children }) => {
    const [userSelections, setUserSelections] = useState([]);

    return (
        <DishesContext.Provider value={{userSelections, setUserSelections }}>
            {children}
        </DishesContext.Provider>
    );
};
