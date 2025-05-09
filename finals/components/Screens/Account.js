import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../mystyle/styles';

const Account = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userName, setUserName] = useState('User'); // Default user name
  const [userId, setUserId] = useState(null);       // User ID
  const [loading, setLoading] = useState(false);    // Loading state

  // Set userId and userName from route params when the route changes
  useEffect(() => {
    const userData = route?.params?.userData;
    if (userData) {
      setUserId(userData._id);
      setUserName(userData.name || 'User');
    }
  }, [route.params]);

  // Fetch user data from backend if userId is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; // Don't fetch if there's no user ID
      setLoading(true); // Set loading state to true

      try {
        const response = await fetch(`http://192.168.100.110:5001/auth/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data && data.name) {
          setUserName(data.name); // Update user name from MongoDB
        } else {
          ToastAndroid.show('Error fetching user data', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error fetching user data from backend:', error);
        ToastAndroid.show('Error fetching user data', ToastAndroid.SHORT);
      } finally {
        setLoading(false); // Set loading state to false once finished
      }
    };

    fetchUserData();
  }, [userId]); // Re-run this effect whenever the userId changes

  // Handle logout
  const handleLogout = () => {
    setUserId(null);
    setUserName('User');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth', params: { screen: 'Login' } }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-outline" size={24} color="#6CE8B7" />
      </TouchableOpacity>

      <Text style={styles.title}>Account</Text>
      <Icon name="person-circle" size={100} color="#5EE6A0" />

      {loading ? (
        <Text style={styles.name}>Loading...</Text>
      ) : (
        <Text style={styles.name}>{userName}</Text>
      )}

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
