import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../mystyle/styles';

const ProfileFam = ({ navigation }) => {
  const [family, setFamily] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 
  const [editedName, setEditedName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [allergies, setAllergies] = useState('');
  const [dislikes, setDislikes] = useState('');

  useEffect(() => {
    const loadFamily = async () => {
      try {
        const userData = await AsyncStorage.getItem('currentUser');
        const storedFamily = JSON.parse(await AsyncStorage.getItem('familyMembers')) || [];
        if (userData) {
          const user = JSON.parse(userData);
          setFamily([{ name: user.name, role: 'Host' }, ...storedFamily]);
        }
      } catch (error) {
        console.error("Error loading family members:", error);
      }
    };
    loadFamily();
  }, []);
  const addFamilyMember = async () => {
    const newMember = { 
      name: `Member ${family.length}`, 
      role: 'Member', 
      birthday: '', 
      medicalCondition: '', 
      allergies: '', 
      dislikes: '' 
    };
    const updatedFamily = [...family, newMember];
    setFamily(updatedFamily);
    await AsyncStorage.setItem('familyMembers', JSON.stringify(updatedFamily.slice(1))); // Exclude host
  };
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const openEditModal = (member) => {
    setSelectedMember(member);
    setEditedName(member.name);
    setBirthday(member.birthday || '');
    setMedicalCondition(member.medicalCondition || '');
    setAllergies(member.allergies || '');
    setDislikes(member.dislikes || '');
    setModalVisible(true);
  };
  const saveChanges = async () => {
    const updatedFamily = family.map(member =>
      member === selectedMember 
        ? { ...member, name: editedName, birthday, medicalCondition, allergies, dislikes } 
        : member
    );
    setFamily(updatedFamily);
    await AsyncStorage.setItem('familyMembers', JSON.stringify(updatedFamily.slice(1))); //Exclude host
    setModalVisible(false);
  };
  const deleteMember = async () => {
    if (!selectedMember) return;
    //Remove the selected member from the list
    const updatedFamily = family.filter(member => member !== selectedMember);
    
    setFamily(updatedFamily);
    
    //Update AsyncStorage (excluding the host)
    await AsyncStorage.setItem('familyMembers', JSON.stringify(updatedFamily.slice(1)));
    setModalVisible(false); // Close modal after deletion
  };

  return (
    <View style={styles.container}>
      <View style={styles.favTopbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.favbackButton}>
          <Icon name="arrow-back-outline" size={24} color="#5EE6A0" />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 55 }}>Family</Text>
      </View>
      <ScrollView contentContainerStyle={styles.familyContainer}>
        {family.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.familyCard}
            onPress={() => openEditModal(member)}
          >
            <Text style={styles.familyRole}>{member.role}</Text>
            <Text style={styles.familyName}>{member.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addFamilyBtn} onPress={addFamilyMember}>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Edit Profile</Text>
      <TextInput style={styles.inputFam} value={editedName} onChangeText={setEditedName} placeholder="Enter Name" />
      <TextInput style={styles.inputFam} value={birthday} onChangeText={setBirthday} placeholder="YYYY-MM-DD" keyboardType="numeric" />
      <Text>Age: {calculateAge(birthday)}</Text>
      <TextInput style={styles.inputFam} value={medicalCondition} onChangeText={setMedicalCondition} placeholder="Medical Condition" />
      <TextInput style={styles.inputFam} value={allergies} onChangeText={setAllergies} placeholder="Allergies" />
      <TextInput style={styles.inputFam} value={dislikes} onChangeText={setDislikes} placeholder="Dislikes" />
      <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteMember} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

export default ProfileFam;
