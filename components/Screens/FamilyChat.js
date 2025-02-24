import React, { useState } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../mystyle/styles'

export const FamilyChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim() === '') return;
        setMessages([...messages, { id: Date.now().toString(), text: inputText }]);
        setInputText('');
      };

  return (
    <View style={styles.container}>
    <View style={styles.container}>

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarsContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons name='person-circle' size={50} color="#fff" key={index} style={styles.avatar} />
          ))}
        </View>
      </View>

      {/* Chat List */}
      <FlatList style={styles.chatcon}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Ionicons name="person-circle" size={70} color="#666" style={styles.avatarIcon} />
            <View style={styles.messageTextContainer}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons name="image" size={28} color="#6CE8B7" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={28} color="#6CE8B7" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default FamilyChat
