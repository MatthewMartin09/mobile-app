import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../mystyle/styles';
import HistoryContext from './HistoryContext';

export const History = () => {
    const { historyList, removeFromHistory, removeMultipleFromHistory, clearHistory } = useContext(HistoryContext);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedItems([]);
    };

    const toggleItemSelection = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(item => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const deleteSelectedItems = () => {
        if (selectedItems.length === 0) {
            Alert.alert("No items selected", "Please select items to delete");
            return;
        }

        Alert.alert(
            "Delete Selected Items",
            `Are you sure you want to delete ${selectedItems.length} selected item(s)?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        removeMultipleFromHistory(selectedItems);
                        setSelectedItems([]);
                        setIsSelectionMode(false);
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const clearAllHistory = () => {
        Alert.alert(
            "Clear All History",
            "Are you sure you want to clear all history?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Clear All",
                    onPress: () => clearHistory(),
                    style: "destructive"
                }
            ]
        );
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.historyheader}>
                    <Text style={{fontSize:30,marginTop:'5%'}}>Meal History</Text>
                    <View style={styles.historyActions}>
                        <TouchableOpacity 
                            style={styles.actionButton} 
                            onPress={toggleSelectionMode}
                        >
                            <Text style={styles.actionButtonText}>
                                {isSelectionMode ? "Cancel" : "Select"}
                            </Text>
                        </TouchableOpacity>
                        {isSelectionMode ? (
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.deleteButton]} 
                                onPress={deleteSelectedItems}
                            >
                                <Text style={styles.actionButtonText}>Delete Selected</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.clearButton]} 
                                onPress={clearAllHistory}
                            >
                                <Text style={styles.actionButtonText}>Clear All</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.historyList}>
                        {historyList.map((dish, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.historyItem, 
                                    isSelectionMode && selectedItems.includes(index) && styles.selectedHistoryItem
                                ]}
                                onPress={() => isSelectionMode && toggleItemSelection(index)}
                            >
                                {isSelectionMode && (
                                    <View style={styles.checkbox}>
                                        {selectedItems.includes(index) ? (
                                            <FontAwesome name="check-square-o" size={24} color="#007AFF" />
                                        ) : (
                                            <FontAwesome name="square-o" size={24} color="#007AFF" />
                                        )}
                                    </View>
                                )}
                                <View style={isSelectionMode ? styles.historyContentWithCheckbox : styles.historyContent}>
                                    <Text style={styles.historyText}>
                                        {dish.type === 'custom' ? `Custom ${dish.name}` : dish.name}
                                    </Text>
                                    <Text style={{fontSize:10,marginTop:5}}>
                                        {formatDate(dish.date)}
                                    </Text>
                                </View>
                                {!isSelectionMode && (
                                    <TouchableOpacity 
                                        style={styles.deleteIcon}
                                        onPress={() => {
                                            Alert.alert(
                                                "Delete Item",
                                                "Are you sure you want to delete this item?",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        style: "cancel"
                                                    },
                                                    {
                                                        text: "Delete",
                                                        onPress: () => removeFromHistory(index),
                                                        style: "destructive"
                                                    }
                                                ]
                                            );
                                        }}
                                    >
                                        <Ionicons name="trash-outline" size={24} color="red" />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default History