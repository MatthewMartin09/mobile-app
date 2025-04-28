import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Helper function to safely handle any array operations
const safeArrayOperation = (array, operation, fallback = []) => {
  if (!array || !Array.isArray(array)) {
    console.warn('Attempted operation on non-array:', array);
    return fallback;
  }
  return operation(array);
};

const ChatBot = ({ visible, onClose, onSaveRecipe, currentDish }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [customizedRecipe, setCustomizedRecipe] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [ingredientToReplace, setIngredientToReplace] = useState('');
  const slideAnim = useRef(new Animated.Value(400)).current;
  const flatListRef = useRef(null);

  // Safely get sample ingredients
  const getSampleIngredients = () => {
    if (!currentDish) return ["Ingredient 1", "Ingredient 2", "Ingredient 3"];
    
    switch(currentDish.name) {
      case 'Adobo':
        return ["Chicken", "Soy Sauce", "Vinegar", "Garlic", "Bay Leaves"];
      case 'Sinigang':
        return ["Pork", "Tamarind", "Vegetables", "Fish Sauce", "Water"];
      default:
        return ["Ingredient 1", "Ingredient 2", "Ingredient 3"];
    }
  };
  
  const sampleIngredients = getSampleIngredients();

  // This function might be what's causing your error
  const generateResponse = (userInput, context) => {
    // If this function exists elsewhere in your app, it might be the source of the error
    // This is a placeholder implementation that safely handles arrays
    const result = {
      text: "I'm not sure I understand. Could you tell me what you'd like to change about the recipe?",
      options: ['See ingredients', 'Replace ingredient', 'Alternative recipes']
    };
    
    // Safe handling of any arrays that might be processed here
    if (context && context.options) {
      result.options = safeArrayOperation(context.options, (arr) => [...arr], []);
    }
    
    return result;
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      try {
        // Initialize conversation based on whether we have a current dish
        if (currentDish && currentDish.name) {
          setMessages([
            { 
              id: 1, 
              text: `I can help you customize your ${currentDish.name} recipe. Would you like to:\n1. See the current ingredients\n2. Replace an ingredient\n3. Get alternative recipes?`, 
              sender: 'bot',
              options: ['See ingredients', 'Replace ingredient', 'Alternative recipes']
            }
          ]);
        } else {
          setMessages([
            { 
              id: 1, 
              text: "Hi! I can help you customize a recipe. What dish would you like to work with?", 
              sender: 'bot' 
            }
          ]);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        setMessages([
          { 
            id: 1, 
            text: "Hi! I can help you customize a recipe. What would you like to do?", 
            sender: 'bot' 
          }
        ]);
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, currentDish]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    try {
      // Add user message
      const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Process user input
      processUserInput(input.toLowerCase());
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        id: prev.length + 2, 
        text: "Sorry, there was an error processing your message. Please try again.", 
        sender: 'bot' 
      }]);
    }
  };

  const processUserInput = (userInput) => {
    // Simulate bot processing delay
    setTimeout(() => {
      try {
        if (isCustomizing && ingredientToReplace) {
          // User is providing a replacement ingredient
          handleIngredientReplacement(userInput);
          return;
        }

        if (userInput.includes('ingredient') || userInput === '1' || userInput.includes('see')) {
          // Show current ingredients
          const ingredients = sampleIngredients || [];
          const ingredientsText = `Current ingredients for ${currentDish?.name || 'this recipe'}:\n${ingredients.join('\n')}`;
          setMessages(prev => [...prev, { 
            id: prev.length + 2, 
            text: ingredientsText, 
            sender: 'bot',
            options: ['Replace ingredient', 'Done']
          }]);
        } 
        else if (userInput.includes('replace') || userInput === '2') {
          // Start ingredient replacement process
          setIsCustomizing(true);
          setMessages(prev => [...prev, { 
            id: prev.length + 2, 
            text: "Which ingredient would you like to replace? Please type the name.", 
            sender: 'bot' 
          }]);
        }
        else if (userInput.includes('alternative') || userInput === '3') {
          // Suggest alternative recipes
          setMessages(prev => [...prev, { 
            id: prev.length + 2, 
            text: "Here are some alternative recipes you might like:\n1. Vegetarian version\n2. Quick version\n3. Spicy version", 
            sender: 'bot',
            options: ['Vegetarian', 'Quick', 'Spicy']
          }]);
        }
        else if (isCustomizing && !ingredientToReplace) {
          // User is specifying which ingredient to replace
          const ingredients = sampleIngredients || [];
          const matchedIngredient = ingredients.find(ing => 
            ing && ing.toLowerCase && ing.toLowerCase().includes(userInput)
          );
          
          if (matchedIngredient) {
            setIngredientToReplace(matchedIngredient);
            setMessages(prev => [...prev, { 
              id: prev.length + 2, 
              text: `What would you like to replace ${matchedIngredient} with?`, 
              sender: 'bot' 
            }]);
          } else {
            setMessages(prev => [...prev, { 
              id: prev.length + 2, 
              text: "I couldn't find that ingredient. Please try again.", 
              sender: 'bot' 
            }]);
          }
        }
        else if (userInput.includes('done') || userInput.includes('finish')) {
          // Finish customization and show the modified recipe
          finishCustomization();
        }
        else {
          // Default response
          // Use the generateResponse function safely
          const response = generateResponse(userInput, {
            options: ['See ingredients', 'Replace ingredient', 'Alternative recipes']
          });
          
          setMessages(prev => [...prev, { 
            id: prev.length + 2, 
            text: response.text, 
            sender: 'bot',
            options: response.options || []
          }]);
        }
      } catch (error) {
        console.error("Error processing input:", error);
        setMessages(prev => [...prev, { 
          id: prev.length + 2, 
          text: "Sorry, there was an error processing your request. Please try again.", 
          sender: 'bot' 
        }]);
      }
    }, 1000);
  };

  const handleIngredientReplacement = (replacement) => {
    try {
      if (!ingredientToReplace) return;
      const ingredients = sampleIngredients || [];
      
      // Create a modified recipe with the replaced ingredient
      const modifiedIngredients = ingredients.map(ing => 
        ing === ingredientToReplace ? `${replacement} (replaces ${ingredientToReplace})` : ing
      );
      
      const modifiedRecipe = {
        name: currentDish?.name ? `Custom ${currentDish.name}` : "Custom Recipe",
        originalDish: currentDish?.name || "Custom dish",
        ingredients: modifiedIngredients,
        steps: currentDish?.steps || [
          "Step 1: Prepare ingredients",
          "Step 2: Cook according to standard recipe",
          "Step 3: Serve"
        ],
        image: currentDish?.image || null,
        customized: true,
        date: new Date().toISOString(),
        nutrition: {
          calories: currentDish?.nutrition?.calories || 500,
          protein: currentDish?.nutrition?.protein || 25,
          carbs: currentDish?.nutrition?.carbs || 30,
          fat: currentDish?.nutrition?.fat || 20
        },
        portions: currentDish?.portions || 4
      };
      
      setCustomizedRecipe(modifiedRecipe);
      
      // Show the modified recipe to the user
      const ingredientsText = `Here's your customized recipe:\n\nIngredients:\n${modifiedIngredients.join('\n')}\n\nWould you like to save this to your meal plan?`;
      
      setMessages(prev => [...prev, { 
        id: prev.length + 2, 
        text: ingredientsText, 
        sender: 'bot',
        showSaveOption: true
      }]);
      
      // Reset customization state
      setIsCustomizing(false);
      setIngredientToReplace('');
    } catch (error) {
      console.error("Error in handleIngredientReplacement:", error);
      setMessages(prev => [...prev, { 
        id: prev.length + 2, 
        text: "Sorry, there was an error customizing your recipe. Please try again.", 
        sender: 'bot' 
      }]);
      setIsCustomizing(false);
      setIngredientToReplace('');
    }
  };

  const finishCustomization = () => {
    try {
      if (!customizedRecipe && currentDish) {
        const ingredients = sampleIngredients || [];
        
        // Create a basic customized recipe even if no changes were made
        const modifiedRecipe = {
          name: `Custom ${currentDish.name}`,
          originalDish: currentDish.name,
          ingredients: ingredients,
          steps: currentDish.steps || [
            "Step 1: Prepare ingredients",
            "Step 2: Cook according to standard recipe",
            "Step 3: Serve"
          ],
          image: currentDish.image || null,
          customized: true,
          date: new Date().toISOString(),
          nutrition: currentDish.nutrition || {
            calories: 500,
            protein: 25,
            carbs: 30,
            fat: 20
          },
          portions: currentDish.portions || 4
        };
        
        setCustomizedRecipe(modifiedRecipe);
        
        const ingredientsText = `Here's your customized recipe:\n\nIngredients:\n${ingredients.join('\n')}\n\nWould you like to save this to your meal plan?`;
        
        setMessages(prev => [...prev, { 
          id: prev.length + 2, 
          text: ingredientsText, 
          sender: 'bot',
          showSaveOption: true
        }]);
      }
      
      setIsCustomizing(false);
      setIngredientToReplace('');
    } catch (error) {
      console.error("Error in finishCustomization:", error);
      setMessages(prev => [...prev, { 
        id: prev.length + 2, 
        text: "Sorry, there was an error finishing your recipe customization. Please try again.", 
        sender: 'bot' 
      }]);
      setIsCustomizing(false);
      setIngredientToReplace('');
    }
  };

  const handleSaveRecipe = async () => {
    try {
      if (customizedRecipe && typeof onSaveRecipe === 'function') {
        onSaveRecipe(customizedRecipe);
        
        const confirmationMsg = { 
          id: messages.length + 1, 
          text: `Your customized ${customizedRecipe.name} has been saved to your meal plan!`, 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, confirmationMsg]);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      setMessages(prev => [...prev, { 
        id: messages.length + 1, 
        text: "Sorry, there was an error saving your recipe. Please try again.", 
        sender: 'bot' 
      }]);
    }
  };

  const handleQuickOption = (option) => {
    try {
      if (option) {
        setInput(option);
        setTimeout(() => handleSend(), 0);
      }
    } catch (error) {
      console.error("Error with quick option:", error);
    }
  };

  // Scroll to the end of messages when messages change
  useEffect(() => {
    try {
      if (flatListRef.current && messages && messages.length > 0) {
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error scrolling to end:", error);
    }
  }, [messages]);

  const renderMessage = ({ item }) => {
    if (!item) return null;
    
    return (
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userMessage : styles.botMessage
      ]}>
        <Text style={styles.messageText}>{item.text || ""}</Text>
        
        {item.options && Array.isArray(item.options) && item.options.length > 0 && (
          <View style={styles.optionsContainer}>
            {item.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleQuickOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {item.showSaveOption && (
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSaveRecipe}
          >
            <Text style={styles.saveButtonText}>Save to Meal Plan</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Function to handle FlatList's keyExtractor safely
  const getKeyExtractor = (item) => {
    return item && item.id ? item.id.toString() : Math.random().toString();
  };

  return (
    <Animated.View style={[
      styles.container,
      { transform: [{ translateX: slideAnim }] },
      visible ? { display: 'flex' } : { display: 'none' }
    ]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recipe Assistant</Text>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={messages || []}
        renderItem={renderMessage}
        keyExtractor={getKeyExtractor}
        style={styles.messageList}
        contentContainerStyle={{ paddingBottom: 10 }}
        ref={flatListRef}
        onEndReached={() => {
          try {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          } catch (error) {
            console.error("Error in onEndReached:", error);
          }
        }}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    zIndex: 999,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  optionText: {
    color: 'white',
    fontSize: 14,
  }
});

export default ChatBot;