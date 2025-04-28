import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../mystyle/styles';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  //Fetch the logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

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
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35,fontWeight:'bold'}}>Name: {user?.name || 'N/A'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35,fontWeight:'bold' }}>Email/Phone: {user?.email || user?.phone || 'N/A'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35,fontWeight:'bold' }}>Date of Birth: {user?.dob || 'N/A'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35,fontWeight:'bold'}}>Gender: {user?.gender || 'N/A'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 35,fontWeight:'bold'}}>Barangay: {user?.barangay || 'N/A'}</Text>
          </View>
          
          <View style={styles.connectProfile}>
            <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }}>Connect accounts</Text>
            <View style={styles.typeProfile}>
              <Text style={{ fontSize: 15, marginTop: 15, color: 'white', textAlign: 'center' }}>Facebook</Text>
            </View>
            <View style={styles.typeProfile2}>
              <Text style={{ fontSize: 15, marginTop: 15, color: 'white', textAlign: 'center' }}>Google</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontSize: 10, marginTop: 15, color: 'black', textAlign: 'center' }}>Delete account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;