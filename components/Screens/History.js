import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../mystyle/styles';
import { useRoute } from '@react-navigation/native';
import HistoryContext from './HistoryContext';


export const History = () => {
    const { historyList } = useContext(HistoryContext);

    return (
    <View style={styles.container}>
        <View style={styles.container}>
            <View style={styles.historyheader}>
                <Text style={{fontSize:25,marginTop:'20%'}}>Meal History</Text>
            </View>
            <ScrollView style={styles.scrollView}>
            <View style={styles.historyList}>
            {historyList.map((dish, index) => (
            <View key={index} style={styles.historyItem}> 
                <Text style={styles.historyText}>{dish}</Text>
            <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsText}>Details</Text>
            </TouchableOpacity>
            </View>
            ))}
            </View>
            </ScrollView>
        </View>
    </View>
  )
}

export default History
