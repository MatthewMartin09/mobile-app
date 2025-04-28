import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../mystyle/styles';
import { 
  Text, View, Image, TextInput, TouchableOpacity, ToastAndroid 
} from 'react-native';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email and password", ToastAndroid.SHORT);
      return;
    }
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();
      const validUser = users.find(user => 
        user.email === trimmedEmail && user.password === trimmedPassword
      );
      if (validUser) {
        //Existing user history exists; new users start with an empty array
        if (!validUser.history) {
          validUser.history = [];
        }
        //Store current session
        await AsyncStorage.setItem('currentUser', JSON.stringify(validUser));
        await AsyncStorage.setItem('userName', validUser.name); //Store userName
        ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
        navigation.replace("Main"); //Redirect to main dashboard
      } else {
        ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Error retrieving user data", ToastAndroid.SHORT);
      console.error("Login error:", error);
    }
  };
  
  return (
    <View style={styles.container}>
          <View style={styles.container}>
      <View style={styles.loginbtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#CAC6C2', fontSize: 20, margin: 10, marginTop: 30 }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assets/PanlasApp.png')} style={styles.logo} />
        <Text style={{ color: '#CAC6C2', fontSize: 20, marginBottom: 20 }}>Login</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email/Phone number" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        <TouchableOpacity style={styles.signbtn} onPress={handleLogin}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, paddingVertical: 10, color: '#2B5D49' }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.signbtn2}>
          <Text style={{ color: '#CAC6C2' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: '#2B5D49', fontWeight: 'bold' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </View>
  );
};
export default Login;
