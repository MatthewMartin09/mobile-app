import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
// Import Picker differently to avoid the naming conflict
import DropDownPicker from 'react-native-dropdown-picker';
// Import DateTimePicker for date selection
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../mystyle/styles';

export const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [contactType, setContactType] = useState('email'); // 'email' or 'phone'
  const [password, setPassword] = useState('');
  



  // Date picker states
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // For the gender dropdown picker
  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [genderItems, setGenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'}
  ]);
  
  // For the barangay dropdown picker
  const [barangayOpen, setBarangayOpen] = useState(false);
  const [barangay, setBarangay] = useState('');
  const [barangayItems, setBarangayItems] = useState([
    {label: 'Barangay 1', value: 'Barangay 1'},
    {label: 'Barangay 2', value: 'Barangay 2'},
    {label: 'Barangay 3', value: 'Barangay 3'},
    {label: 'Barangay 4', value: 'Barangay 4'},
    {label: 'Barangay 5', value: 'Barangay 5'},
    {label: 'Barangay 6', value: 'Barangay 6'},
    {label: 'Barangay 7', value: 'Barangay 7'},
    {label: 'Barangay 8', value: 'Barangay 8'},
    {label: 'Barangay 9', value: 'Barangay 9'},
    {label: 'Barangay 10', value: 'Barangay 10'},
  ]);
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Very Weak',
    color: '#FF0000'
  });

  // Check password strength
  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const checkPasswordStrength = (pwd) => {
    // Initialize score and strength variables
    let score = 0;
    let strengthLabel = 'Very Weak';
    let strengthColor = '#FF0000'; // Red
    
    // Basic length-based scoring as per user requirements
    if (pwd.length < 4) {
      // Very weak - less than 4 characters
      score = 1;
      strengthLabel = 'Very Weak';
      strengthColor = '#FF0000'; // Red
    } else if (pwd.length < 6) {
      // Very weak - at least 4 characters
      score = 2;
      strengthLabel = 'Very Weak';
      strengthColor = '#FF0000'; // Red
    } else if (pwd.length < 8) {
      // Weak - at least 6 characters
      score = 3;
      strengthLabel = 'Weak';
      strengthColor = '#FF6600'; // Orange
    } else if (pwd.length < 12) {
      // Moderate - at least 8 characters
      score = 4;
      strengthLabel = 'Moderate';
      strengthColor = '#FFCC00'; // Yellow
    } else {
      // Strong - at least 12 characters
      score = 5;
      strengthLabel = 'Strong';
      strengthColor = '#00CC00'; // Green
    }
    
    // Additional complexity checks to boost score
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    
    // Count complexity factors
    const complexityFactors = [hasUppercase, hasLowercase, hasNumbers, hasSpecial].filter(Boolean).length;
    
    // Boost score based on complexity
    if (complexityFactors >= 3) {
      // If password has good complexity and decent length, upgrade to next level
      if (score < 5) {
        score += 1;
        // Update label accordingly
        if (score === 3) strengthLabel = 'Weak';
        if (score === 4) strengthLabel = 'Moderate';
        if (score === 5) strengthLabel = 'Strong';
      }
    }
    
    // Always make passwords with 20+ chars that have some complexity "Strong"
    if (pwd.length >= 20 && complexityFactors >= 2) {
      score = 5;
      strengthLabel = 'Strong';
      strengthColor = '#00CC00'; // Green
    }
    
    // Update color based on final strength label
    if (strengthLabel === 'Weak') strengthColor = '#FF6600'; // Orange
    if (strengthLabel === 'Moderate') strengthColor = '#FFCC00'; // Yellow
    if (strengthLabel === 'Strong') strengthColor = '#00CC00'; // Green
    
    setPasswordStrength({
      score,
      label: strengthLabel,
      color: strengthColor
    });
  };

  // Handle contact type toggle
  const toggleContactType = () => {
    setContactType(prev => prev === 'email' ? 'phone' : 'email');
    setContactInput(''); // Clear input when switching type
  };

  // Validate contact input
  const validateContact = () => {
    if (contactType === 'email') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(contactInput);
    } else if (contactType === 'phone') {
      return contactInput.length === 11;  // Check for 11-digit phone number
    }
    return false;
  };
  

  // Handle date change
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, the picker remains open
    setDate(currentDate);
    
    // Format date as YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    setDob(`${year}-${month}-${day}`);
  };

  // Show date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Close dropdowns when scrolling
  const onScroll = useCallback(() => {
    if (genderOpen) {
      setGenderOpen(false);
    }
    if (barangayOpen) {
      setBarangayOpen(false);
    }
  }, [genderOpen, barangayOpen]);

  const handleSignup = async () => {
    if (!name || !contactInput || !password || !dob || !gender || !barangay) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    if (!validateContact()) {
      ToastAndroid.show(
        contactType === 'email' ? 'Invalid email address' : 'Invalid phone number',
        ToastAndroid.SHORT
      );
      return;
    }
  
    try {
      const trimmedContact = contactInput.trim().toLowerCase();
  
      const response = await fetch('http://192.168.100.110:5001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          contactInput: trimmedContact,
          password,
          dob,
          gender,
          barangay,
          contactType: contactType,
        }),
      });
  
      const data = await response.json();
  
      if (data.message) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        if (data.message === 'User signed up successfully') {
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      ToastAndroid.show('Signup failed. Please try again.', ToastAndroid.SHORT);
    }
  };
    
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.loginbtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#CAC6C2', fontSize: 20, margin: 10, marginTop: 30 }}>Login</Text>
        </TouchableOpacity>
      </View>
      
      {/* Logo and title */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image source={require('../../assets/PanlasApp.png')} style={styles.logo} />
        <Text style={{ color: '#CAC6C2', fontSize: 20, marginBottom: 10 }}>Sign up</Text>
      </View>
      
      {/* Main content area */}
      <View style={{ flex: 1, width: '100%' }}>
        {/* Gender dropdown positioned absolutely to avoid nesting issues */}
        {genderOpen && (
          <View 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: '10%', 
              width: '80%', 
              zIndex: 5000 
            }}
          >
            <DropDownPicker
              open={genderOpen}
              value={gender}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={setGender}
              setItems={setGenderItems}
              placeholder="Select Gender"
              style={{
                backgroundColor: 'white',
                borderColor: '#ccc',
                minHeight: 50,
                marginTop: 390
              }}
              dropDownContainerStyle={{
                backgroundColor: 'white',
                borderColor: '#ccc',
                marginTop: 390
              }}
              zIndex={5000}
              zIndexInverse={1000}
            />
          </View>
        )}
        
        {/* Barangay dropdown positioned absolutely */}
        {barangayOpen && (
          <View 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: '10%', 
              width: '80%', 
              zIndex: 4000 
            }}
          >
            <DropDownPicker
              open={barangayOpen}
              value={barangay}
              items={barangayItems}
              setOpen={setBarangayOpen}
              setValue={setBarangay}
              setItems={setBarangayItems}
              placeholder="Select Barangay"
              style={{
                backgroundColor: 'white',
                borderColor: '#ccc',
                minHeight: 50,
                marginTop: 440
              }}
              dropDownContainerStyle={{
                backgroundColor: 'white',
                borderColor: '#ccc',
                marginTop: 440
              }}
              zIndex={4000}
              zIndexInverse={2000}
            />
          </View>
        )}
        
        {/* ScrollView for form fields */}
        <ScrollView 
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TextInput 
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            
            <TextInput 
              style={styles.input}
              placeholder={contactType === 'email' ? "Email Address" : "Phone Number (11 digits)"}
              value={contactInput}
              onChangeText={setContactInput}
              keyboardType={contactType === 'email' ? "email-address" : "numeric"}
            />
            {/* Email/Phone toggle button */}
              <TouchableOpacity 
              onPress={toggleContactType}
              style={{ alignSelf: 'flex-end', marginRight: 40, marginBottom: 5,}}
            >
              <Text style={{ color: '#2B5D49', fontSize: 14}}>
                Use {contactType === 'email' ? 'Phone Number' : 'Email'} instead
              </Text>
            </TouchableOpacity>
            
            <TextInput 
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            {/* Simplified password strength indicator */}
            <View style={{ width: '80%', marginBottom: 10 }}>
              <View style={{ 
                height: 5,
                width: `${(passwordStrength.score / 5) * 100}%`,
                backgroundColor: passwordStrength.color,
                borderRadius: 5
              }} />
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ color: passwordStrength.color, fontSize: 12 }}>
                  {passwordStrength.label}
                </Text>
              </View>
            </View>
            
            {/* Date of Birth Picker */}
            <TouchableOpacity 
              style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
              onPress={showDatepicker}
            >
              <Text style={{ color: dob ? '#000' : '#757575' }}>
                {dob ? dob : "Date of Birth"}
              </Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()} // Cannot select future dates
                minimumDate={new Date(1920, 0, 1)} // Reasonable minimum date
              />
            )}
            
            {/* Gender dropdown placeholder when closed */}
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setGenderOpen(true)}
            >
              <Text style={{ color: gender ? '#000' : '#757575' }}>
                {gender ? gender : "Select Gender"}
              </Text>
            </TouchableOpacity>
            
            {/* Barangay dropdown placeholder when closed */}
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setBarangayOpen(true)}
            >
              <Text style={{ color: barangay ? '#000' : '#757575' }}>
                {barangay ? barangay : "Select Barangay"}
              </Text>
            </TouchableOpacity>
            
            {/* Empty space to account for dropdown height when open */}
            {(genderOpen || barangayOpen) && <View style={{ height: 150 }} />}
            
            <TouchableOpacity onPress={handleSignup} style={styles.signbtn}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, paddingVertical: 10, color: '#2B5D49' }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            
            <Text style={{ marginTop: 40, color: '#CAC6C2' }}>Continue with</Text>
            <View style={styles.btnCon}>
              <TouchableOpacity style={styles.fbbtn}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, paddingVertical: 15, color: 'white' }}>
                  Facebook
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gbtn}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, paddingVertical: 15, color: 'white' }}>
                  Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;