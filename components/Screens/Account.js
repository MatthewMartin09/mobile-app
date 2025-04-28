import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../mystyle/styles';

const Account = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('User'); // Default to "User"

  // Fetch user data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const getUserName = async () => {
        try {
          const userData = await AsyncStorage.getItem('currentUser');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setUserName(parsedUser.name || 'User');
          }
        } catch (error) {
          console.error("Error retrieving user name:", error);
        }
      };
      getUserName();
    }, [])
  );
  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser'); // Clear user session
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth', params: { screen: 'Login' } }], // Redirects to Login inside Auth stack
        })
      );
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-outline" size={24} color="#6CE8B7" />
      </TouchableOpacity>
      <Text style={styles.title}>Account</Text>
      <Icon name="person-circle" size={100} color="#5EE6A0" />
      <Text style={styles.name}>{userName}</Text> 
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Text style={styles.profileText}>View profile</Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonAcc} onPress={() => navigation.navigate('MealPlans')}>
          <Text style={styles.buttonTextAcc}>Meal Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAcc} onPress={() => navigation.navigate('ProfileFam')}>
          <Text style={styles.buttonTextAcc}>Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAcc} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonTextAcc}>Settings</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('HelpCenter')}>
        <Text>Help center</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('TermsCondition')}>
        <Text>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Account;