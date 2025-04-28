import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const tutorialSteps = [
    { id: 1, message: 'Navigation bar\nLorem Ipsum...', position: { bottom: 80, left: 80 }, screen: 'BtnNav' },
    { id: 2, message: 'Explore different dishes here.', position: { bottom: 80, left: 20 }, screen: 'BtnNav' },
    { id: 3, message: 'Manage your circle here.', position: { bottom: 80, left: 40 }, screen: 'Family' },
    { id: 4, message: 'See your meal history here.', position: { bottom: 80, left: 100 }, screen: 'History' },
    { id: 5, message: 'Tap here to view your profile and settings.', position: { bottom: 80, left: 170 }, screen: 'Account' },
];

const TutorialOverlay = ({ navigation }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        navigation.navigate(tutorialSteps[stepIndex].screen);
    }, [stepIndex]);
    const handleNext = () => {
        if (stepIndex < tutorialSteps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setShowModal(true);
        }
    };
    const handleReplay = () => {
        setStepIndex(0);
        setShowModal(false);
    };
    const handleEndTutorial = () => {
        setShowModal(false);
        navigation.replace('Dashboard'); //End tutorial and go to main screen
    };
    return (
        <View style={styles.fullScreen}>
            <View style={[styles.tooltip, tutorialSteps[stepIndex].position]}>
                <Text style={styles.text}>{tutorialSteps[stepIndex].message}</Text>
                <TouchableOpacity onPress={handleNext} style={styles.button}>
                    <Text style={styles.buttonText}>{stepIndex === tutorialSteps.length - 1 ? 'Finish' : 'Got it'}</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Ready to Cook and Prepare your Meal?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleEndTutorial} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleReplay} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Replay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#5EE6A0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    modalButton: {
        marginHorizontal: 10,
        backgroundColor: '#5EE6A0',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TutorialOverlay;