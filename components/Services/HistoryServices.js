import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'history';

export const HistoryService = {
  // Add a dish to history
  addToHistory: async (dishName) => {
    try {
      // Get existing history
      const history = JSON.parse(await AsyncStorage.getItem(HISTORY_KEY)) || [];
      
      // Create history entry
      const historyEntry = {
        id: `history-${Date.now()}`,
        name: dishName,
        date: new Date().toISOString(),
        isCustomized: false
      };
      
      // Check if this dish is already in history
      const existingIndex = history.findIndex(item => item.name === dishName && !item.isCustomized);
      
      // If it exists, remove it (we'll add it back at the top)
      if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
      }
      
      // Add to history (at the beginning)
      const updatedHistory = [historyEntry, ...history];
      
      // Limit history to 50 items
      const trimmedHistory = updatedHistory.slice(0, 50);
      
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
      
      return historyEntry;
    } catch (error) {
      console.error('Error adding to history:', error);
      throw error;
    }
  },
  
  // Get viewing history
  getHistory: async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem(HISTORY_KEY)) || [];
      return history;
    } catch (error) {
      console.error('Error getting history:', error);
      throw error;
    }
  },
  
  // Clear history
  clearHistory: async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  },
  
  // Get recent dishes (last 5)
  getRecentDishes: async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem(HISTORY_KEY)) || [];
      
      // Get unique dish names from history
      const uniqueDishes = [];
      const dishNames = new Set();
      
      for (const item of history) {
        if (!dishNames.has(item.name)) {
          dishNames.add(item.name);
          uniqueDishes.push(item);
          
          if (uniqueDishes.length >= 5) break;
        }
      }
      
      return uniqueDishes;
    } catch (error) {
      console.error('Error getting recent dishes:', error);
      throw error;
    }
  }
};

export default HistoryService;