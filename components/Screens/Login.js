import React from 'react'
import { styles } from '../../mystyle/styles'
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity, ToastAndroid , Button} from 'react-native';

export const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.container}>
        <View style={styles.loginbtn}>
          <TouchableOpacity>
            <Text onPress={() => navigation.navigate('Register')} style={{color:'#CAC6C2',fontWeight:'regular',fontSize:15}}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1, width:'100%',justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../assets/favicon.png')} style={styles.logo}></Image>
          <Text style={{color:'#CAC6C2',fontWeight:'regular',fontSize:20, position:'relative',bottom:'50'}}>Login</Text>
          <TextInput style={styles.input} placeholder="Email/Phone number"></TextInput>
          <TextInput style={styles.input} placeholder="Password"></TextInput>
          <TouchableOpacity style={styles.signbtn}>
            <Text onPress={() => navigation.navigate('Home')} style={{textAlign:'center',fontWeight:'bold', fontSize:15, alignItems: 'center', justifyContent:'center', paddingVertical: 10, fontFamily:'Inter', color:'#2B5D49'}}>Login</Text>
          </TouchableOpacity>
        <View style={styles.signbtn2}>
            <Text style={{color:'#CAC6C2',alignItems:'center',textAlign:'center'}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Sign up</Text>
            </TouchableOpacity>
        </View>
      </View>
      </View>
    </View>
  )
}

export default Login
