import React, { useState } from 'react'
import { styles } from '../../mystyle/styles'
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TabRouter } from '@react-navigation/native';


export const FoodDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.container}>
        <View style={styles.fooddeetHeader}>
            <TouchableOpacity style={{padding:5,marginTop:'10%',marginRight:'80%'}}>
                <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
        <View style={styles.foodDetail}>
            <Image source={require('../../assets/KNRR_0069-1.png')} style={{ width: 300, height: 150, borderRadius:30}}/>
        </View>
        <View style={styles.divider} />
        {/* Title & Rating */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lorem Ipsum</Text>
          <View style={styles.rating}>
            <FontAwesome name="star" size={16} color="gold" />
            <Text style={styles.ratingText}> 4.5</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <View style={styles.ingredientsList}>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
        </View>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Steps:</Text>
        <View style={styles.ingredientsList}>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
          <Text style={styles.ingredient}>• Lorem Ipsum</Text>
        </View>
      </ScrollView>
        </View>
    </View>
  )
}

export default FoodDetails
