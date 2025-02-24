import React, { useContext } from 'react'
import { styles } from '../../mystyle/styles'
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity, ToastAndroid , Button} from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import HistoryContext from './HistoryContext';

export const Dashbrd = ({navigation}) => {
  const { addToHistory } = useContext(HistoryContext);

  return (
    <View style={styles.container}>
        <View style={styles.container}>
        <View style={styles.topbar}>
            {/* <TextInput style={{width: '70%',borderColor:'#999',marginBottom: 5,padding: 20,borderWidth: 2,borderRadius:30,height:10,color:'black',marginTop:'20'}}></TextInput> */}
            <TextInput style={styles.inputdsh} placeholder="Search"></TextInput>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.tabs}>
              <Text>hwihud</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabs}>
              <Text>hwihud</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabs}>
              <Text>hwihud</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabs}>
              <Text>hwihud</Text>
          </TouchableOpacity>
          </View>
        {/* end of divider */}
        <View style={styles.sgtdish}>
        <Text style={{fontSize:18, marginTop:1}}>Suggested Dishes</Text>
        </View>
        <View style={styles.dishes}>
          {['Food1', 'Food2', 'Food3', 'Food4', 'Food5', 'Food6'].map((dish, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                addToHistory(dish);
                navigation.navigate('FoodDetails', { dishName: dish }); 
              }}
              style={styles.dish}
            >
              <Text>{dish}</Text>
            </TouchableOpacity>
          ))}
        </View>
        </View>
    </View>
  )
}

export default Dashbrd
