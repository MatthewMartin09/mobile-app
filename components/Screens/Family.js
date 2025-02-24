import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../mystyle/styles';
import { Ionicons } from '@expo/vector-icons';

export const Family = ({navigation}) => {
  const [inviteCode, setInviteCode] = useState('-----'); 

  const generateInviteCode = () => {
    const randomCode = Math.floor(10000 + Math.random() * 90000).toString();
    setInviteCode(randomCode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topbar}>
            <TouchableOpacity>
                <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <Text style={{ fontSize: 40 }}>Invite Code</Text>
        <View style={styles.divider} />
        <View style={styles.contectxt}>
          <Text style={{ fontSize: 14 }}>Share this invite code with the people</Text>
          <Text style={{ fontSize: 14 }}>you want in your Circle:</Text>
        </View>

        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{inviteCode}</Text>
        </View>
            <Text style={{ fontSize: 14,margin:20}}>This code will be active for 24hrs</Text>
        <TouchableOpacity style={styles.button} onPress={generateInviteCode}>
          <Text style={styles.buttonText}>Generate Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.buttonText} >Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Family;
