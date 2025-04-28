import React, { useContext, useEffect, useState } from 'react';
import { styles } from '../../mystyle/styles';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryContext from './HistoryContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const Dashbrd = ({ navigation }) => {
  const { addToHistory } = useContext(HistoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  // Categories for tabs - added Noodles
  const categories = ['All', 'Soup', 'Meat', 'Vegetable', 'Noodles'];

  const dishes = [
    { 
      name: 'Sinigang', 
      image: require('../../assets/KNRR_0069.png'),
      category: 'Soup',
      priceRange: 'mid-range',
      prepTime: '45 mins',
      steps: [
        "Boil pork in water until tender",
        "Add tamarind and vegetables",
        "Season with fish sauce to taste",
        "Simmer for 15 minutes"
      ],
      nutrition: {
        calories: 350,
        protein: 25,
        carbs: 20,
        fat: 15,
        fiber: 5
      },
    },
    { 
      name: 'Adobo', 
      image: require('../../assets/Adobo.jpg'),
      category: 'Meat',
      priceRange: 'low-range',
      prepTime: '30 mins'
    },
    { 
      name: 'Kare-kare', 
      image: require('../../assets/karekare.jpeg'),
      category: 'Meat',
      priceRange: 'high-range',
      prepTime: '60 mins'
    },
    { 
      name: 'Pakbet', 
      image: require('../../assets/Pakbet.jpg'),
      category: 'Vegetable',
      priceRange: 'low-range',
      prepTime: '25 mins'
    },
    { 
      name: 'Bulalo', 
      image: require('../../assets/Bulalo.jpg'),
      category: 'Soup',
      priceRange: 'high-range',
      prepTime: '90 mins'
    },
    { 
      name: 'Tinola', 
      image: require('../../assets/Tinola.jpg'),
      category: 'Soup',
      priceRange: 'mid-range',
      prepTime: '40 mins'
    },
    { 
      name: 'Pancit Canton', 
      image: require('../../assets/Adobo.jpg'),
      category: 'Noodles',
      priceRange: 'low-range',
      prepTime: '20 mins'
    },
  ];

  // Recommended dishes based on popularity
  const recommendedDishes = [
    { 
      name: 'Pancit Canton', 
      image: require('../../assets/Adobo.jpg'),
      description: 'Quick and easy noodle dish'
    },
    { 
      name: 'Chicken Inasal', 
      image: require('../../assets/Bulalo.jpg'),
      description: 'Grilled chicken with unique marinade'
    },
  ];

  // Price filter options - updated labels
  const priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: 'Low-Range', value: 'low-range' },
    { label: 'Mid-Range', value: 'mid-range' },
    { label: 'High-Range', value: 'high-range' }
  ];

  useEffect(() => {
    const loadFavorites = async () => {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (currentUser) {
        setFavorites(currentUser.favorites || []);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (dish) => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      
      if (!currentUser) {
        console.error("No user found. Cannot update favorites.");
        return;
      }
      const userFavoritesKey = `favorites_${currentUser.email}`;
      let updatedFavorites = [];
      if (favorites.includes(dish)) {
        updatedFavorites = favorites.filter(item => item !== dish); // Remove from favorites
      } else {
        updatedFavorites = [...favorites, dish]; // Add to favorites
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(userFavoritesKey, JSON.stringify(updatedFavorites));
      //Update currentUser object
      currentUser.favorites = updatedFavorites;
      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
      //Update global user list
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const updatedUsers = users.map(user => 
        user.email === currentUser.email ? { ...user, favorites: updatedFavorites } : user
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log("Favorites updated for", currentUser.email, updatedFavorites);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Filter dishes based on search query, category and price filter
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'All' || dish.category === activeTab;
    const matchesPrice = priceFilter === 'all' || dish.priceRange === priceFilter;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Map dish names to specific detail screens
  const screenMap = {
    'Sinigang': 'FoodDetails',
    'Adobo': 'FoodDetails2',
    'Kare-kare': 'FoodDetails3',
    'Pakbet': 'FoodDetails4',
    'Bulalo': 'FoodDetails5',
    'Tinola': 'FoodDetails6',
    'Pancit Canton': 'FoodDetails7',
  };

  // Modified function to render individual dish card without customize button
  const renderDishCard = (dish, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        addToHistory(dish.name);
        const screenName = screenMap[dish.name] || "FoodDetails";
        navigation.navigate(screenName, { dishName: dish.name });
      }}
      style={[styles.dishCard, { backgroundColor: 'white' }]}
    >
      <Image source={dish.image} style={styles.dishImage} />
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.priceRangeText}>{dish.priceRange}</Text>
        <Text style={styles.dishMeta}>{dish.prepTime}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => toggleFavorite(dish.name)} 
        style={styles.heartButtonCard}
      >
        <Icon 
          name={favorites.includes(dish.name) ? "heart" : "heart-outline"} 
          size={22} 
          color="red" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRecommendationCard = (dish, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.recommendationCard, { backgroundColor: 'white' }]}
    >
      <Image source={dish.image} style={styles.recommendationImage} />
      <View style={styles.recommendationInfo}>
        <Text style={styles.recommendationName}>{dish.name}</Text>
        <Text style={styles.recommendationDesc}>{dish.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.containerdash}>
          {/* Header with Logo and Search Bar */}
          <View style={styles.headerContainer}>
            {/* App Logo */}
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/PanlasApp.png')}
                style={styles.logoImage} 
              />
              <Text style={styles.logoText}>PanlasApp</Text>
            </View>
            
            {/* Search and Favorites */}
            <View style={styles.topbar}>
              <TextInput
                style={styles.inputdsh}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Favorites")} style={styles.favButton}>
                <Icon name="heart" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Improved Price Filter Dropdown */}
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2
              }}
              onPress={() => setShowPriceDropdown(!showPriceDropdown)}
            >
              <Text style={{ fontSize: 14, color: '#333' }}>
                {priceOptions.find(option => option.value === priceFilter)?.label || 'All Prices'}
              </Text>
              <Icon name={showPriceDropdown ? "chevron-up" : "chevron-down"} size={18} color="#333" />
            </TouchableOpacity>

            {/* Dropdown Options with Better Design */}
            {showPriceDropdown && (
              <View style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                position: 'absolute',
                top: 50,
                left: 0,
                right: 0,
                zIndex: 999,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5
              }}>
                {priceOptions.map((option, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={{
                      padding: 12,
                      borderBottomWidth: index < priceOptions.length - 1 ? 1 : 0,
                      borderBottomColor: '#eee',
                      backgroundColor: priceFilter === option.value ? '#f0f8ff' : 'white'
                    }}
                    onPress={() => {
                      setPriceFilter(option.value);
                      setShowPriceDropdown(false);
                    }}
                  >
                    <Text style={{
                      color: priceFilter === option.value ? '#4CAF50' : '#333',
                      fontWeight: priceFilter === option.value ? 'bold' : 'normal'
                    }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Category Tabs */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={{
                  backgroundColor: activeTab === item ? '#4CAF50' : '#E8E8E8',
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  marginVertical: 8
                }}
                onPress={() => setActiveTab(item)}
              >
                <Text style={{
                  color: activeTab === item ? 'white' : '#333',
                  fontWeight: activeTab === item ? 'bold' : 'normal'
                }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.categoryTabs}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggested Dishes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Dishes Grid */}
          <View style={styles.dishesGrid}>
            {filteredDishes.map((dish, index) => renderDishCard(dish, index))}
          </View>

          {/* Recommendations Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommendations For You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recommendationsContainer}>
            {recommendedDishes.map((dish, index) => renderRecommendationCard(dish, index))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashbrd;