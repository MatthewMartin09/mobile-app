import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Modal,
  Alert,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../mystyle/styles';

const FoodDetails2 = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [portionCount, setPortionCount] = useState(1);
  
  // Simplified ingredients list without editing functionality
  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Lorem Ipsum 1', isMainIngredient: true },
    { id: '2', name: 'Lorem Ipsum 2', isMainIngredient: false },
    { id: '3', name: 'Lorem Ipsum 3', isMainIngredient: false },
    { id: '4', name: 'Lorem Ipsum 4', isMainIngredient: false },
    { id: '5', name: 'Lorem Ipsum 5', isMainIngredient: false },
  ]);

  // Recipe data - in a real app, this would come from route.params
  const recipeData = {
    id: '1',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: null, // In a real app, you would have an image here
  };
  
  // Nutrition data (per portion)
  const nutritionData = {
    calories: 350,
    protein: 25,
    carbs: 40,
    fat: 12,
    fiber: 5
  };

  // Get today's date in YYYY-MM-DD format for calendar validation
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayString();

  const adjustPortion = (direction) => {
    if (direction === 'increase') {
      setPortionCount(prev => prev + 1);
    } else if (direction === 'decrease' && portionCount > 1) {
      setPortionCount(prev => prev - 1);
    }
  };

  const createMealPlan = async () => {
    if (!selectedDate) {
      Alert.alert('Please select a date');
      return;
    }
    try {
      // Create the new meal plan object
      const newMealPlan = {
        id: Date.now().toString(), // Generate a unique ID
        recipeTitle: recipeData.title,
        description: recipeData.description,
        date: selectedDate,
        portions: portionCount,
        ingredients: ingredients,
        nutrition: {
          calories: nutritionData.calories * portionCount,
          protein: nutritionData.protein * portionCount,
          carbs: nutritionData.carbs * portionCount,
          fat: nutritionData.fat * portionCount,
          fiber: nutritionData.fiber * portionCount
        },
        image: recipeData.image
      };
      
      // Get existing meal plans from AsyncStorage
      const storedPlans = await AsyncStorage.getItem('mealPlans');
      let mealPlans = storedPlans ? JSON.parse(storedPlans) : [];
      
      // Add the new meal plan
      mealPlans.push(newMealPlan);
      
      // Save back to AsyncStorage
      await AsyncStorage.setItem('mealPlans', JSON.stringify(mealPlans));
      
      // Alert the user and navigate to MealPlans
      Alert.alert('Success', 'Meal plan created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MealPlans')
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not create meal plan. Please try again.');
      console.error(error);
    }
  };

  // Simplified ingredient rendering without edit/replace buttons
  const renderIngredient = (ingredient) => (
    <View style={localStyles.ingredientItem} key={ingredient.id}>
      <Text style={ingredient.isMainIngredient ? styles.ingredient : styles.subIngredient}>
        {ingredient.isMainIngredient ? '• ' : '- '}
        {ingredient.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.fooddeetHeader}>
          <TouchableOpacity style={{ padding: 5, marginTop: '10%', marginRight: '90%' }}>
            <Ionicons onPress={() => navigation.navigate('BtnNav')} name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        {/* Recipe Title */}
        <Text style={styles.recipeTitle}>Lorem Ipsum</Text>
        
        {/* Recipe Description */}
        <View style={styles.foodDetail}>
          <Image source={require('../../assets/Adobo.jpg')} style={{ width: 300, height: 150, borderRadius: 30 }} />
        </View>
        <Text style={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <View style={styles.divider} />
        
        {/* Simplified Ingredients Section without Edit */}
        <View style={localStyles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
        </View>
        
        <View style={styles.ingredientsList}>
          {ingredients.map(ingredient => renderIngredient(ingredient))}
        </View>
        
        <View style={styles.divider} />
        
        {/* Steps Section */}
        <Text style={styles.sectionTitle}>Steps:</Text>
        <View style={styles.stepsList}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <Text key={step} style={styles.stepText}>• Step {step}: Lorem ipsum</Text>
          ))}
        </View>
        <View style={styles.divider} />
        
        {/* Nutrition Information */}
        <Text style={styles.sectionTitle}>Nutrition (per portion):</Text>
        <View style={styles.nutritionContainer}>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Calories:</Text>
            <Text style={styles.nutritionValue}>{nutritionData.calories} kcal</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Protein:</Text>
            <Text style={styles.nutritionValue}>{nutritionData.protein}g</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Carbs:</Text>
            <Text style={styles.nutritionValue}>{nutritionData.carbs}g</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Fat:</Text>
            <Text style={styles.nutritionValue}>{nutritionData.fat}g</Text>
          </View>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Fiber:</Text>
            <Text style={styles.nutritionValue}>{nutritionData.fiber}g</Text>
          </View>
        </View>
        <View style={styles.divider} />
        
        {/* Portion Control Section */}
        <View style={styles.portionContainer}>
          <Text style={styles.portionTitle}>Portions:</Text>
          <View style={styles.portionControls}>
            <TouchableOpacity 
              style={styles.portionButton}
              onPress={() => adjustPortion('decrease')}
            >
              <Text style={styles.portionButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.portionCount}>{portionCount}</Text>
            <TouchableOpacity 
              style={styles.portionButton}
              onPress={() => adjustPortion('increase')}
            >
              <Text style={styles.portionButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.portionInfo}>Good for {portionCount}-{portionCount + 1} persons</Text>
          
          {/* Date Selection */}
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.dateButtonText}>
              {selectedDate ? `Selected: ${selectedDate}` : 'Select Date'}
            </Text>
            <Ionicons name="calendar" size={20} color="#5CC199" />
          </TouchableOpacity>
          
          {/* Create Meal Plan Button */}
          <TouchableOpacity 
            style={[
              styles.createPlanButton,
              !selectedDate && styles.disabledButton
            ]}
            disabled={!selectedDate}
            onPress={createMealPlan}
          >
            <Text style={styles.createPlanButtonText}>Create Meal Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={localStyles.modalTitle}>Select Date</Text>
            <Calendar
              onDayPress={(day) => {
                // Only allow selection of current or future dates
                if (day.dateString >= today) {
                  setSelectedDate(day.dateString);
                  setShowCalendar(false);
                } else {
                  Alert.alert("Invalid Date", "Please select today or a future date.");
                }
              }}
              markedDates={{
                [selectedDate]: {selected: true, selectedColor: '#5CC199'}
              }}
              minDate={today} // Set minimum date to today
              disableAllTouchEventsForDisabledDays={true}
              theme={{
                textDisabledColor: '#d9e1e8',
                disabledArrowColor: '#d9e1e8',
                todayTextColor: '#5CC199',
                selectedDayBackgroundColor: '#5CC199',
              }}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Local styles specific to this component
const localStyles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
});

export default FoodDetails2;