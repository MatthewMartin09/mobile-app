import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [historyList, setHistoryList] = useState([]);

  // Load history when user logs in
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
        if (currentUser) {
          // Check if the user already has a history, if not set it as an empty array
          const userHistory = currentUser.history ? currentUser.history : [];
          setHistoryList(userHistory);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  // Function to add items to history
  const addToHistory = async (dishName, isCustom = false) => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (currentUser) {
        // Ensure history array exists
        const updatedHistory = currentUser.history ? [...currentUser.history] : [];
        
        // Create history entry
        const historyEntry = isCustom ? 
          { type: 'custom', name: dishName, date: new Date().toISOString() } :
          { type: 'standard', name: dishName, date: new Date().toISOString() };
        
        // Add to history
        updatedHistory.push(historyEntry);
        currentUser.history = updatedHistory;
        
        // Save to AsyncStorage
        await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update global users
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const updatedUsers = users.map(user =>
          user.email === currentUser.email ? currentUser : user
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update local state
        setHistoryList(updatedHistory);
      }
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  };

  // Function to remove a single item from history
  const removeFromHistory = async (index) => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (currentUser && currentUser.history) {
        const updatedHistory = [...currentUser.history];
        updatedHistory.splice(index, 1);
        
        // Update user's history
        currentUser.history = updatedHistory;
        await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update global users
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const updatedUsers = users.map(user =>
          user.email === currentUser.email ? currentUser : user
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update local state
        setHistoryList(updatedHistory);
      }
    } catch (error) {
      console.error('Error removing from history:', error);
    }
  };

  // Function to remove multiple items from history
  const removeMultipleFromHistory = async (indices) => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (currentUser && currentUser.history) {
        const updatedHistory = [...currentUser.history];
        
        // Sort indices in descending order to avoid shifting issues when deleting
        const sortedIndices = [...indices].sort((a, b) => b - a);
        sortedIndices.forEach(index => {
          updatedHistory.splice(index, 1);
        });
        
        // Update user's history
        currentUser.history = updatedHistory;
        await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update global users
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const updatedUsers = users.map(user =>
          user.email === currentUser.email ? currentUser : user
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update local state
        setHistoryList(updatedHistory);
      }
    } catch (error) {
      console.error('Error removing multiple items from history:', error);
    }
  };

  // Function to clear all history
  const clearHistory = async () => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (currentUser) {
        // Clear history
        currentUser.history = [];
        await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update global users
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const updatedUsers = users.map(user =>
          user.email === currentUser.email ? currentUser : user
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update local state
        setHistoryList([]);
      }
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <HistoryContext.Provider value={{ 
      historyList, 
      addToHistory, 
      removeFromHistory,
      removeMultipleFromHistory,
      clearHistory 
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
