import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../../mystyle/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const TermsConditions = ({navigation}) => {
    return (
    <View style={styles.container}>
        <View style={styles.container}>
            <View style={styles.favTopbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.favbackButton}>
                    <Icon name="arrow-back-outline" size={24} color="#5EE6A0" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, textAlign: 'center', marginTop:55 }}>PanlasApp</Text>
            </View>
            <View style={styles.TermContainer}>
                <Text style={{fontWeight:'bold', fontSize:18, margin:20}}>Terms & Conditions</Text>
                <Text style={{fontWeight:'thin', fontSize:15}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                <Text style={{fontWeight:'thin', fontSize:15, marginTop:20}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                <Text style={{fontWeight:'thin', fontSize:15}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum</Text>
            </View>
        </View>
    </View>
    )
}

export default TermsConditions
