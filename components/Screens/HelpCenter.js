import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../../mystyle/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpCenter = ({ navigation }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqData = [
        { id: '1', question: 'How to use this app?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' },
        { id: '2', question: 'How to reset my password?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' },
        { id: '3', question: 'How to contact support?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' },
        { id: '4', question: 'How to delete my account?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' },
        { id: '5', question: 'Is my data secure?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' },
        { id: '6', question: 'Can I update my profile?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'},        
        { id: '7', question: 'How to delete my acoount?', answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' }
        ];

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
            <View style={styles.favTopbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.favbackButton}>
                    <Icon name="arrow-back-outline" size={24} color="#5EE6A0" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, textAlign: 'center', marginTop:55 }}>Help Center</Text>
            </View>
            <View style={styles.HelpContainer}>
                <View style={styles.HelpSearch}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Hello, how can we help you?</Text>
                </View>
                <ScrollView contentContainerStyle={styles.helpList}>
                    {faqData.map((item, index) => (
                        <View key={item.id} style={styles.helpBox}>
                            <TouchableOpacity 
                                onPress={() => toggleExpand(index)}
                                style={styles.helpBoxTouchable}
                            >
                                <Text style={styles.helpBoxText}>{item.question}</Text>
                                <Text style={styles.helpIcon}>{expandedIndex === index ? '−' : '+'}</Text>
                            </TouchableOpacity>
                            {expandedIndex === index && (
                                <View style={styles.answerBox}>
                                    <Text style={styles.answerText}>{item.answer}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
            </View>
        </View>
    );
}

export default HelpCenter;
