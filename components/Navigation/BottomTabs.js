import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashbrd from "../Screens/Dashbrd";
import Family from "../Screens/Family";
import Account from "../Screens/Account";
import History from "../Screens/History";
import FamilyChat from "../Screens/FamilyChat";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return(
        <Tab.Navigator      
            screenOptions={{
                headerStyle: { backgroundColor: '#6CE8B7' },
            tabBarStyle: {
                backgroundColor: '#6CE8B7',
                paddingTop: 20,
                height: 100,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderTopWidth: 5,
                borderColor: '#5CC199',
            },
            tabBarActiveTintColor: '#EE3131',
            tabBarInactiveTintColor: '#ffffff',
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
            },
        }}>

            <Tab.Screen 
                name="Food" 
                component={Dashbrd} 
                options={{ tabBarIcon: ({ color, size }) => (<Icon name="restaurant-outline" color={color} size={size} />) }} 
            />
            <Tab.Screen 
                name="Family" 
                component={Family} 
                options={{ tabBarIcon: ({ color, size }) => (<Icon name="people-outline" color={color} size={size} />) }} 
            />
            <Tab.Screen 
                name="Chat" 
                component={FamilyChat} 
                options={{ tabBarIcon: ({ color, size }) => (<Icon name="chatbubble" color={color} size={size} />) }} 
            />
            <Tab.Screen 
                name="History" 
                component={History} 
                options={{ tabBarIcon: ({ color, size }) => (<Icon name="time-outline" color={color} size={size} />) }} 
            />
            <Tab.Screen 
                name="Account" 
                component={Account} 
                options={{ tabBarIcon: ({ color, size }) => (<Icon name="person-outline" color={color} size={size} />) }} 
            />
        </Tab.Navigator>
        
    )
}

export default BottomTabs