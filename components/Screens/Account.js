import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Account = () => {
  const navigation = useNavigation();

  const handleTutorialNavigation = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('TutorialOverlay'); // Ensure TutorialOverlay is in the navigation stack
    } else {
      console.warn("Navigation is not available"); // Debugging if navigation fails
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-outline" size={24} color="#5EE6A0" />
      </TouchableOpacity>

      <Text style={styles.title}>Account</Text>
      
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePic} />
      <Text style={styles.name}>Mica Silverio</Text>
      <Text style={styles.profileText}>View profile</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Family')}>
          <Text style={styles.buttonText}>Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('HelpCenter')}>
        <Text>Help center</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('TermsConditions')}>
        <Text>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleTutorialNavigation}>
        <Text>Tutorial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#FEFBEA', paddingTop: 40 },
  backButton: { position: 'absolute', top: 40, left: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc', marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  profileText: { color: 'gray', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 20 },
  button: { backgroundColor: '#5EE6A0', padding: 15, borderRadius: 10, width: '30%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { width: '80%', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  logoutButton: { backgroundColor: '#5EE6A0', padding: 15, borderRadius: 10, marginTop: 20, width: '80%', alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold' }
});

export default Account;
