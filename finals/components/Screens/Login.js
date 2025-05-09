import React, { useState } from 'react';
import { styles } from '../../mystyle/styles';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email and password", ToastAndroid.SHORT);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('http://192.168.100.110:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactInput: email.trim().toLowerCase(),
          password: password.trim(),
          contactType: email.includes('@') ? 'email' : 'phone',
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data?.user?._id) {
        const userResponse = await fetch(`http://192.168.100.110:5001/auth/user/${data.user._id}`);
        const userData = await userResponse.json();
  
        if (userResponse.ok && userData?._id) {
          ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
          navigation.replace("Main", { userData });
        } else {
          ToastAndroid.show("Failed to fetch user profile", ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(data.message || "Login failed", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Login error:", error);
      ToastAndroid.show("Error logging in. Please try again.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
        <TouchableOpacity
          style={styles.signbtn}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, paddingVertical: 10, color: '#2B5D49' }}>
            {loading ? 'Logging in...' : 'Login'}
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
  );
};

export default Login;
