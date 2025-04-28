import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const MEAL_PLANS_KEY = 'mealPlans';
const HISTORY_KEY = 'history';

export const CustomDishService = {
  // Save a customized dish to meal plans
  saveCustomDishToMealPlan: async (customDish, date = null) => {
    try {
      // If no date is provided, use today's date
      const mealDate = date || new Date().toISOString().split('T')[0];
      
      // Get existing meal plans
      const existingPlans = JSON.parse(await AsyncStorage.getItem(MEAL_PLANS_KEY)) || [];
      
      // Create a new meal plan entry
      const newMealPlan = {
        id: `custom-${Date.now()}`,
        recipeTitle: customDish.recipeTitle || `Custom ${customDish.name}`,
        description: customDish.description || `Customized version of ${customDish.name}`,
        date: mealDate,
        portions: customDish.portions || 2,
        nutrition: customDish.nutrition || {
          calories: 350, // Default calories
        },
        ingredients: customDish.ingredients || [],
        steps: customDish.steps || [],
        isCustomized: true,
        customizedDate: new Date().toISOString(),
        originalDishName: customDish.name
      };
      
      // Add to meal plans
      const updatedPlans = [...existingPlans, newMealPlan];
      await AsyncStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(updatedPlans));
      
      return newMealPlan;
    } catch (error) {
      console.error('Error saving custom dish to meal plan:', error);
      throw error;
    }
  },
  
  // Add a customized dish to history
  addCustomDishToHistory: async (customDish) => {
    try {
      // Get existing history
      const history = JSON.parse(await AsyncStorage.getItem(HISTORY_KEY)) || [];
      
      // Create history entry
      const historyEntry = {
        id: `history-${Date.now()}`,
        name: customDish.recipeTitle || `Custom ${customDish.name}`,
        date: new Date().toISOString(),
        isCustomized: true,
        originalDishName: customDish.name
      };
      
      // Add to history
      const updatedHistory = [historyEntry, ...history];
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      
      return historyEntry;
    } catch (error) {
      console.error('Error adding custom dish to history:', error);
      throw error;
    }
  },
  
  // Get all customized dishes
  getCustomizedDishes: async () => {
    try {
      const mealPlans = JSON.parse(await AsyncStorage.getItem(MEAL_PLANS_KEY)) || [];
      return mealPlans.filter(plan => plan.isCustomized);
    } catch (error) {
      console.error('Error getting customized dishes:', error);
      throw error;
    }
  },
  
  // Get a specific customized dish by ID
  getCustomizedDishById: async (id) => {
    try {
      const mealPlans = JSON.parse(await AsyncStorage.getItem(MEAL_PLANS_KEY)) || [];
      return mealPlans.find(plan => plan.id === id && plan.isCustomized);
    } catch (error) {
      console.error('Error getting customized dish by ID:', error);
      throw error;
    }
  }
};

export default CustomDishService;