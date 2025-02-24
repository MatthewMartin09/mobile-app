import React, { createContext, useState } from 'react';

// Create Context
export const HistoryContext = createContext();

// Create Provider Component
export const HistoryProvider = ({ children }) => {
  const [historyList, setHistoryList] = useState([]);

  // Function to add items to history
  const addToHistory = (dishName) => {
    setHistoryList((prevHistory) => {
        if (prevHistory.includes(dishName)) {
          return prevHistory;
        }
        return [...prevHistory, dishName];
      });
    };

  return (
    <HistoryContext.Provider value={{ historyList, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext
