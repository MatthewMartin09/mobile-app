import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../mystyle/styles';

export const FoodDetails2 = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempText, setTempText] = useState('');

  useEffect(() => {
    const loadIngredients = async () => {
      const storedIngredients = await AsyncStorage.getItem('ingredientsList3'); 
      if (storedIngredients) {
        setIngredients(JSON.parse(storedIngredients));
      } else {
        setIngredients([
          'Lorem Ipsum 1',
          'Lorem Ipsum 2',
          'Lorem Ipsum 3',
          'Lorem Ipsum 4',
          'Lorem Ipsum 5',
        ]);
      }
    };
    loadIngredients();
  }, []);
  //Save ingredients to AsyncStorage
  const saveIngredients = async (updatedIngredients) => {
    await AsyncStorage.setItem('ingredientsList3', JSON.stringify(updatedIngredients)); 
    setIngredients(updatedIngredients);
  };
  //Start Editing
  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempText(ingredients[index]);
  };
  //Save Edited Ingredient
  const handleSave = (index) => {
    if (tempText.trim() !== '') {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = tempText;
      saveIngredients(updatedIngredients); //Save to FoodDetails2 storage
      setEditingIndex(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFFF0' }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View style={styles.fooddeetHeader}>
            <TouchableOpacity style={{ padding: 5, marginTop: '10%', marginRight: '80%' }}>
              <Ionicons onPress={() => navigation.navigate('BtnNav')} name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.foodDetail}>
            <Image source={require('../../assets/karekare.jpeg')} style={{ width: 300, height: 150, borderRadius: 30 }} />
          </View>
          <View style={styles.divider} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lorem Ipsum</Text>
            <View style={styles.rating}>
              <FontAwesome name="star" size={16} color="gold" />
              <Text style={styles.ratingText}> 4.5</Text>
            </View>
          </View>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <View style={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                {editingIndex === index ? (
                  <>
                    <TextInput
                      style={styles.ingredientInput}
                      value={tempText}
                      onChangeText={setTempText}
                      autoFocus
                    />
                    <TouchableOpacity onPress={() => handleSave(index)} style={styles.saveButton}>
                      <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.ingredient}>• {ingredient}</Text>
                    <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                      <Ionicons name="pencil" size={18} color="#5CC199" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Steps:</Text>
          <View style={styles.ingredientsList}>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
            <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FoodDetails2;
