import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../mystyle/styles';

const Profile = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const userId = route?.params?.userId;  // Retrieve the userId from navigation params

  // Fetch the logged-in user's data from MongoDB
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://192.168.100.110:5001/auth/user/${userId}`);
        const data = await response.json();
      setLoading(true);
      try {
        if (!userId) {
          ToastAndroid.show("No user ID provided", ToastAndroid.SHORT);
          return; // If no userId is provided, stop the function
        }
        if (response.ok && data?.user?._id) {
          setUser(data.user); // Store the user data in state
        } else {
          ToastAndroid.show("Failed to fetch user profile", ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        ToastAndroid.show("Error fetching user data", ToastAndroid.SHORT);
      } finally {
        setLoading(false); // Stop loading once the request is finished
      }
    };

    fetchUserData(); // Call fetchUserData when the component mounts
  }, [route.params]);

  if (loading) {
    return <Text>Loading...</Text>; // You can return a loading spinner here
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.favTopbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.favbackButton}>
            <Icon name="arrow-back-outline" size={24} color="#5EE6A0" />
          </TouchableOpacity>
          <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 55 }}>Profile</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35, fontWeight: 'bold' }}>
              Name: {userData.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35, fontWeight: 'bold' }}>
              Email/Phone: {userData.email || userData.phone || 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35, fontWeight: 'bold' }}>
              Date of Birth: {userData.dob || 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35, fontWeight: 'bold' }}>
              Gender: {userData.gender || 'N/A'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35, fontWeight: 'bold' }}>
              Barangay: {userData.barangay || 'N/A'}
            </Text>
          </View>

          <View style={styles.connectProfile}>
            <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }}>Connect accounts</Text>
            <View style={styles.typeProfile}>
              <Text style={{ fontSize: 15, marginTop: 15, color: 'white', textAlign: 'center' }}>
                Facebook
              </Text>
            </View>
            <View style={styles.typeProfile2}>
              <Text style={{ fontSize: 15, marginTop: 15, color: 'white', textAlign: 'center' }}>
                Google
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontSize: 10, marginTop: 15, color: 'black', textAlign: 'center' }}>
                Delete account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
