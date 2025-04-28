import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../mystyle/styles';

export const FamilyChat = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: inputText, isSent: true }]); // Assume user sent it
    setInputText('');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarsContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons name='person-circle' size={50} color="#fff" key={index} style={styles.avatar} />
          ))}
        </View>
      </View>
      <FlatList
        style={styles.chatcon}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSent = item.isSent; //Determines if the message is sent or received
          return (
            <View style={[styles.messageBubble, isSent ? styles.sentMessage : styles.receivedMessage]}>
              {/*Avatar first if received*/}
              {!isSent && <Ionicons name="person-circle" size={40} color="#666" style={styles.avatarIcon} />}
              {/*Message Bubble*/}
              <View style={styles.messageTextContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
              {/*Avatar last if sent*/}
              {isSent && <Ionicons name="person-circle" size={60} color="#666" style={styles.avatarIcon} />}
            </View>
          );
        }}
      />
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
  );
};

export default FamilyChat;