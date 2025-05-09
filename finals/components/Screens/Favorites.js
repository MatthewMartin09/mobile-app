import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ToastAndroid, Image, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// Updated minimalist styles
const minimalStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFEF2', // Soft cream background
    paddingTop: StatusBar.currentHeight || 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0E8',
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginRight: 40, // To balance with back button
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
  gridContainer: {
    paddingHorizontal: 4,
  },
  dishCard: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dishImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dishInfo: {
    padding: 12,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailsButton: {
    backgroundColor: '#5EE6A0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 6,
  },
  detailsText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#FFF0F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 6,
  },
  removeText: {
    color: '#FF5A5A',
    fontWeight: '500',
    fontSize: 14,
  }
};

const Favorites = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  
  // Load user and favorites from AsyncStorage
  const loadFavorites = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Load user's favorites
        const userFavorites = await AsyncStorage.getItem(`favorites_${parsedUser.email}`);
        setFavorites(userFavorites ? JSON.parse(userFavorites) : []);
      } else {
        setUser(null);
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading in favorites:", error);
    }
  }, []);
  
  // Reload when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );
  
  // Save updated favorites
  const saveFavorites = async (newFavorites) => {
    if (!user) return;
    try {
      setFavorites(newFavorites);
      await AsyncStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavorites));
      // Update global user data
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const updatedUsers = users.map((u) =>
        u.email === user.email ? { ...u, favorites: newFavorites } : u
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      // Update current user in storage
      const updatedUser = { ...user, favorites: newFavorites };
      setUser(updatedUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error saving in favorites:", error);
    }
  };
  
  const removeFavorite = async (dish) => {
    if (!user) return;
    const updatedFavorites = favorites.filter((item) => item !== dish);
    await saveFavorites(updatedFavorites);
    ToastAndroid.show(`${dish} removed from favorites`, ToastAndroid.SHORT);
  };
  
  const handleNavigate = (dishName) => {
    const screenMap = {
      'Sinigang': 'FoodDetails',
      'Adobo': 'FoodDetails2',
      'Kare-kare': 'FoodDetails3',
      'Pakbet': 'FoodDetails4',
      'Bulalo': 'FoodDetails5',
      'Tinola': 'FoodDetails6',
    };
    if (screenMap[dishName]) {
      navigation.navigate(screenMap[dishName], { dishName });
    }
  };

  // Images for Each Dish
  const getDishImage = (dishName) => {
    const dishImages = {
      'Sinigang': require('../../assets/KNRR_0069.png'),
      'Adobo': require('../../assets/Adobo.jpg'),
      'Kare-kare': require('../../assets/karekare.jpeg'),
      'Pakbet': require('../../assets/Pakbet.jpg'),
      'Bulalo': require('../../assets/Bulalo.jpg'),
      'Tinola': require('../../assets/Tinola.jpg'),
    };
    return dishImages[dishName] || require('../../assets/adaptive-icon.png'); 
  };

  // Render each favorite dish item
  const renderDishItem = ({ item }) => (
    <View style={minimalStyles.dishCard}>
      <Image 
        source={getDishImage(item)} 
        style={minimalStyles.dishImage} 
        resizeMode="cover"
      />
      <View style={minimalStyles.dishInfo}>
        <Text style={minimalStyles.dishName}>{item}</Text>
        <View style={minimalStyles.buttonRow}>
          <TouchableOpacity 
            onPress={() => handleNavigate(item)} 
            style={minimalStyles.detailsButton}
          >
            <Text style={minimalStyles.detailsText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => removeFavorite(item)} 
            style={minimalStyles.removeButton}
          >
            <Text style={minimalStyles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={minimalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEF2" />
      
      {/* Header */}
      <View style={minimalStyles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('BtnNav')} 
          style={minimalStyles.backButton}
        >
          <Icon name="arrow-back-outline" size={24} color="#5EE6A0" />
        </TouchableOpacity>
        <Text style={minimalStyles.title}>Favorites</Text>
      </View>
      
      {/* Content */}
      <View style={minimalStyles.content}>
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDishItem}
          ListEmptyComponent={
            <Text style={minimalStyles.emptyText}>
              No favorites yet. Add some dishes to your favorites.
            </Text>
          }
          numColumns={2}
          contentContainerStyle={minimalStyles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Favorites;