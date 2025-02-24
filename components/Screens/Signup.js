import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity, ToastAndroid, } from 'react-native';
import { useState } from 'react';
import { styles } from '../../mystyle/styles';

export const Signup = ({navigation}) => {
    
    return (
      <View style={styles.container}>
        <View style={styles.container}>
        <View style={styles.loginbtn}>
          <TouchableOpacity>
            <Text style={{color:'#CAC6C2',fontWeight:'regular',fontSize:15}}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1, width:'100%',justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../assets/favicon.png')} style={styles.logo}></Image>
          <Text style={{color:'#CAC6C2',fontWeight:'regular',fontSize:20, position:'relative',bottom:'70'}}>Sign up</Text>
          <TextInput style={styles.input} placeholder="Name"></TextInput>
          <TextInput style={styles.input} placeholder="Email/Phone number"></TextInput>
          <TextInput style={styles.input} placeholder="Password"></TextInput>
          <TextInput style={styles.input} placeholder="Date of Birth"></TextInput>
          <TextInput style={styles.input} placeholder="Gender"></TextInput>
  
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signbtn}>
            <Text style={{textAlign:'center',fontWeight:'bold', fontSize:15, alignItems: 'center', justifyContent:'center', paddingVertical: 10, fontFamily:'Inter', color:'#2B5D49'}}>Sign Up</Text>
          </TouchableOpacity>
              <Text style={{position:'relative', top:30, color:'#CAC6C2'}}>Continue with</Text>
  
        <View style={[styles.btnCon, styles.shadowProp]}>
          <TouchableOpacity style={styles.fbbtn}>
            <Text style={{textAlign:'center',fontWeight:'bold', fontSize:15, alignItems: 'center', justifyContent:'center', paddingVertical: 15, color:'white',}}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gbtn}>
            <Text style={{textAlign:'center',fontWeight:'bold', fontSize:15, alignItems: 'center', justifyContent:'center', paddingVertical: 15, color:'white'}}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </View>
  )
}

export default Signup