import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
  Image,
  TextInput
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MealPlans = ({ navigation }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMeal, setEditingMeal] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  // States for portion editing
  const [showPortionModal, setShowPortionModal] = useState(false);
  const [newPortionValue, setNewPortionValue] = useState('');
  const DEFAULT_CALORIES_PER_PORTION = 350;
  // New state for viewing meal details
  const [viewingMeal, setViewingMeal] = useState(null);
  const [showMealDetailsModal, setShowMealDetailsModal] = useState(false);

  // Get today's date in YYYY-MM-DD format for calendar validation
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayString();

  // Format date string to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Check if a date is today
  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  };

  // Check if a date is tomorrow
  const isTomorrow = (dateString) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(dateString);
    return date.setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0);
  };

  // Get a friendly date display
  const getFriendlyDateDisplay = (dateString) => {
    if (isToday(dateString)) {
      return 'Today';
    } else if (isTomorrow(dateString)) {
      return 'Tomorrow';
    } else {
      return formatDate(dateString);
    }
  };

  // Load meal plans from AsyncStorage
  const loadMealPlans = async () => {
    try {
      setLoading(true);
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (currentUser) {
        const userMealPlansKey = `mealplans_${currentUser.email}`;
        const storedPlans = await AsyncStorage.getItem(userMealPlansKey);
        if (storedPlans) {
          setMealPlans(JSON.parse(storedPlans));
        }
      }
    } catch (error) {
      console.error('Failed to load meal plans:', error);
      Alert.alert('Error', 'Failed to load meal plans');
    } finally {
      setLoading(false);
    }
  };

  // Load meal plans on component mount
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMealPlans();
    });
    return unsubscribe;
  }, [navigation]);

  // Handle viewing meal details
  const handleViewMealDetails = (meal) => {
    setViewingMeal(meal);
    setShowMealDetailsModal(true);
  };

  // Handle editing a meal plan date
  const handleEditDate = (meal) => {
    setEditingMeal(meal);
    setSelectedDate(meal.date);
    setShowCalendar(true);
  };

  // Handle editing portions
  const handleEditPortions = (meal) => {
    setEditingMeal(meal);
    setNewPortionValue(meal.portions.toString());
    setShowPortionModal(true);
  };

  // Calculate calories based on portion size
  const calculateCalories = (originalCalories, originalPortions, newPortions) => {
    // If we have the original calorie value, calculate proportionally
    if (originalCalories && originalPortions) {
      const caloriesPerPortion = originalCalories / originalPortions;
      return Math.round(caloriesPerPortion * newPortions);
    }
    // Otherwise use the default value
    return DEFAULT_CALORIES_PER_PORTION * newPortions;
  };

  // Update meal plan portions
  const updateMealPlanPortions = async () => {
    try {
      if (!editingMeal) return;
      
      // Validate input
      const portionValue = parseInt(newPortionValue);
      if (isNaN(portionValue) || portionValue <= 0) {
        Alert.alert('Invalid Input', 'Please enter a valid positive number for portions');
        return;
      }
      
      // Calculate new calories based on portion change
      const newCalories = calculateCalories(
        editingMeal.nutrition.calories,
        editingMeal.portions,
        portionValue
      );
      
      // Create updated meal plans array
      const updatedMealPlans = mealPlans.map(meal => 
        meal.id === editingMeal.id ? { 
          ...meal, 
          portions: portionValue,
          nutrition: {
            ...meal.nutrition,
            calories: newCalories
          }
        } : meal
      );
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('mealPlans', JSON.stringify(updatedMealPlans));
      
      // Update state
      setMealPlans(updatedMealPlans);
      setEditingMeal(null);
      setShowPortionModal(false);
      
      Alert.alert('Success', 'Meal plan portions updated successfully!');
    } catch (error) {
      console.error('Failed to update meal plan portions:', error);
      Alert.alert('Error', 'Failed to update meal plan portions');
    }
  };

  // Update meal plan date
  const updateMealPlanDate = async (newDate) => {
    try {
      if (!editingMeal) return;
      // Create updated meal plans array
      const updatedMealPlans = mealPlans.map(meal => 
        meal.id === editingMeal.id ? { ...meal, date: newDate } : meal
      );
      // Save to AsyncStorage
      await AsyncStorage.setItem('mealPlans', JSON.stringify(updatedMealPlans));
      
      // Update state
      setMealPlans(updatedMealPlans);
      setEditingMeal(null);
      
      Alert.alert('Success', 'Meal plan date updated successfully!');
    } catch (error) {
      console.error('Failed to update meal plan:', error);
      Alert.alert('Error', 'Failed to update meal plan');
    }
  };

  // Delete a meal plan
  const deleteMealPlan = async (id) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this meal plan?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: async () => {
              const updatedMealPlans = mealPlans.filter(meal => meal.id !== id);
              await AsyncStorage.setItem('mealPlans', JSON.stringify(updatedMealPlans));
              setMealPlans(updatedMealPlans);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Failed to delete meal plan:', error);
      Alert.alert('Error', 'Failed to delete meal plan');
    }
  };

  // Group meal plans by date
  const groupedMealPlans = mealPlans.reduce((groups, meal) => {
    if (!groups[meal.date]) {
      groups[meal.date] = [];
    }
    groups[meal.date].push(meal);
    return groups;
  }, {});

  // Convert grouped meal plans to array for FlatList
  const groupedMealPlansArray = Object.keys(groupedMealPlans).map(date => ({
    date,
    formattedDate: getFriendlyDateDisplay(date),
    meals: groupedMealPlans[date]
  })).sort((a, b) => a.date.localeCompare(b.date));

// Update the renderMealItem function
const renderMealItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.mealItem}
    onPress={() => handleViewMealDetails(item)}
  >
    <View style={styles.mealHeader}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.mealTitle}>{item.recipeTitle || item.name}</Text>
        {item.customized && (
          <View style={styles.customBadge}>
            <MaterialCommunityIcons name="chef-hat" size={14} color="white" />
            <Text style={styles.customBadgeText}>Custom</Text>
          </View>
        )}
      </View>
      <View style={styles.mealActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditPortions(item)}
        >
          <Ionicons name="restaurant-outline" size={20} color="#5CC199" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditDate(item)}
        >
          <Ionicons name="calendar-outline" size={20} color="#5CC199" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => deleteMealPlan(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
    
    {item.description && (
      <Text style={styles.mealDescription}>{item.description}</Text>
    )}
    
    {item.originalDish && (
      <Text style={styles.mealDescription}>Based on: {item.originalDish}</Text>
    )}
    
    <View style={styles.mealDetails}>
      <Text style={styles.mealInfo}>Portions: {item.portions || 4}</Text>
      <Text style={styles.mealInfo}>Calories: {item.nutrition?.calories || 'N/A'} kcal</Text>
    </View>
    
    <Text style={styles.tapPrompt}>Tap to view details</Text>
  </TouchableOpacity>
);

  // Render a group of meal plans for a date
  const renderDateGroup = ({ item }) => (
    <View style={styles.dateGroup}>
      <View style={styles.dateHeaderContainer}>
        {isToday(item.date) && (
          <View style={styles.todayIndicator} />
        )}
        <Text style={styles.dateHeader}>{item.formattedDate}</Text>
      </View>
      <FlatList
        data={item.meals}
        renderItem={renderMealItem}
        keyExtractor={meal => meal.id}
        scrollEnabled={false}
      />
    </View>
  );

  // Render an ingredient in the details modal
  const renderIngredient = (ingredient) => (
    <View style={styles.ingredientItem} key={ingredient.id}>
      <View style={styles.ingredientNameContainer}>
        <Text style={styles.ingredientPrefix}>
          {ingredient.isMainIngredient ? '• ' : '- '}
        </Text>
        <Text style={styles.ingredientName}>
          {ingredient.name}
        </Text>
      </View>
      
      {ingredient.isReplaced && (
        <View style={styles.replacedBadge}>
          <Text style={styles.replacedText}>Replaced</Text>
          <Text style={styles.originalText}>
            Original: {ingredient.originalName}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Plans</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BtnNav')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.centerContent}>
          <Text>Loading meal plans...</Text>
        </View>
      ) : mealPlans.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>No meal plans yet</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('FoodDetails2')}
          >
            <Text style={styles.createButtonText}>Create Meal Plan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={groupedMealPlansArray}
          renderItem={renderDateGroup}
          keyExtractor={group => group.date}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Calendar Modal for Editing Date */}
      <Modal visible={showCalendar} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select New Date</Text>
            <Calendar
              onDayPress={(day) => {
                // Only allow selection of current or future dates
                if (day.dateString >= today) {
                  setSelectedDate(day.dateString);
                  setShowCalendar(false);
                  updateMealPlanDate(day.dateString);
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
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Portion Editing Modal */}
      <Modal visible={showPortionModal} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Portions</Text>
            <TextInput
              style={styles.portionInput}
              value={newPortionValue}
              onChangeText={setNewPortionValue}
              keyboardType="numeric"
              placeholder="Enter number of portions"
            />
            {editingMeal && (
              <Text style={styles.caloriePreview}>
                Estimated calories: {calculateCalories(
                  editingMeal.nutrition.calories,
                  editingMeal.portions,
                  parseInt(newPortionValue) || 0
                )} kcal
              </Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowPortionModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={updateMealPlanPortions}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Meal Details Modal */}
      <Modal visible={showMealDetailsModal} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.detailsModalContent}>
            {viewingMeal && (
              <>
                <View style={styles.detailsHeader}>
                  <Text style={styles.detailsTitle}>{viewingMeal.recipeTitle}</Text>
                  <TouchableOpacity 
                    style={styles.closeDetailsButton}
                    onPress={() => {
                      setShowMealDetailsModal(false);
                      setViewingMeal(null);
                    }}
                  >
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Description:</Text>
                  <Text style={styles.detailsText}>{viewingMeal.description}</Text>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Date:</Text>
                  <Text style={styles.detailsText}>{getFriendlyDateDisplay(viewingMeal.date)}</Text>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Portions:</Text>
                  <Text style={styles.detailsText}>{viewingMeal.portions}</Text>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>Nutrition:</Text>
                  <View style={styles.nutritionDetails}>
                    <Text style={styles.nutritionItem}>Calories: {viewingMeal.nutrition.calories} kcal</Text>
                    {viewingMeal.nutrition.protein && (
                      <Text style={styles.nutritionItem}>Protein: {viewingMeal.nutrition.protein}g</Text>
                    )}
                    {viewingMeal.nutrition.carbs && (
                      <Text style={styles.nutritionItem}>Carbs: {viewingMeal.nutrition.carbs}g</Text>
                    )}
                    {viewingMeal.nutrition.fat && (
                      <Text style={styles.nutritionItem}>Fat: {viewingMeal.nutrition.fat}g</Text>
                    )}
                    {viewingMeal.nutrition.fiber && (
                      <Text style={styles.nutritionItem}>Fiber: {viewingMeal.nutrition.fiber}g</Text>
                    )}
                  </View>
                </View>
                
                {viewingMeal.ingredients && viewingMeal.ingredients.length > 0 && (
                  <View style={styles.detailsSection}>
                    <Text style={styles.detailsSectionTitle}>Ingredients:</Text>
                    <View style={styles.ingredientsList}>
                      {viewingMeal.ingredients.map(ingredient => renderIngredient(ingredient))}
                    </View>
                    
                    {viewingMeal.ingredients.some(ing => ing.isReplaced) && (
                      <View style={styles.ingredientNote}>
                        <MaterialIcons name="info-outline" size={16} color="#5CC199" />
                        <Text style={styles.noteText}>
                          Some ingredients have been replaced with alternatives.
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => {
                    setShowMealDetailsModal(false);
                    setViewingMeal(null);
                  }}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFF0',
  },
  customBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customBadgeText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop:30
  },
  addButton: {
    backgroundColor: '#5CC199',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:35
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#5CC199',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    padding: 15,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todayIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5CC199',
    marginRight: 8,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  mealItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  mealActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 15,
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mealInfo: {
    fontSize: 14,
    color: '#555',
  },
  customizedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  customizedText: {
    fontSize: 12,
    color: '#5CC199',
    marginLeft: 4,
    fontStyle: 'italic',
  },
  tapPrompt: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    maxHeight: '80%',
  },
  detailsModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#5CC199',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  portionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  caloriePreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#5CC199',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  closeDetailsButton: {
    padding: 5,
  },
  detailsSection: {
    marginBottom: 15,
  },
  detailsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailsText: {
    fontSize: 15,
    color: '#555',
  },
  nutritionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionItem: {
    fontSize: 14,
    color: '#555',
    marginRight: 15,
    marginBottom: 5,
  },
  ingredientsList: {
    marginTop: 5,
  },
  ingredientItem: {
    marginBottom: 8,
  },
  ingredientNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientPrefix: {
    fontSize: 14,
    color: '#555',
  },
  ingredientName: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  replacedBadge: {
    backgroundColor: '#f0f9f6',
    borderRadius: 5,
    padding: 5,
    marginTop: 3,
    marginLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: '#5CC199',
  },
  replacedText: {
    fontSize: 12,
    color: '#5CC199',
    fontWeight: 'bold',
  },
  originalText: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 2,
  },
  ingredientNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  noteText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 5,
    flex: 1,
  }
});

export default MealPlans;
