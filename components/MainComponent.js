import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Use this if using Expo

// Screens
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Dashbrd from './Screens/Dashbrd';
import Family from './Screens/Family';
import FamilyChat from './Screens/FamilyChat';
import FoodDetails from './Screens/FoodDetails';
import History from './Screens/History';
import Account from './Screens/Account';
import { HistoryProvider } from './Screens/HistoryContext';



// Screen names
const signupName = 'Signup';
const loginName = 'Login';
const dashName = 'Home';
const famName='Connect'
const chatName='Chat'
const fooddtl='FoodDetails'
const historyName='History'
const accName='Account'

const Tab = createBottomTabNavigator();

export default function MainComponent() {
  return (
    <HistoryProvider>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={dashName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === dashName) {
              iconName = focused ? 'restaurant-outline' : 'restaurant-outline';
            } else if (rn === famName) {
                iconName = focused ? 'people-outline' : 'people-outline'
            } else if (rn === accName) {
              iconName = focused ? 'person' : 'person'
            }
            else if (rn === historyName) {
              iconName = focused ? 'time-outline' : 'time-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle:{
            backgroundColor: '#6CE8B7',
            paddingTop: 20,
            height: 100, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderLeftWidth:5,
            borderRightWidth:5,
            borderTopWidth:5,
            borderColor:'#5CC199',
          },
            keyboardHidesTabBar: true, // Added this line
            tabBarActiveTintColor: '#EE3131', 
            tabBarInactiveTintColor: '#ffffff', 
            tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#6CE8B7', // Change this color to modify the header
            },
            headerTintColor: '#ffffff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            
        })}
        
      >
        <Tab.Screen name={dashName} component={Dashbrd} />
        <Tab.Screen name={famName} component={Family} />
        <Tab.Screen name={historyName} component={History} />
        <Tab.Screen name={accName} component={Account} />
        
      </Tab.Navigator>
    </NavigationContainer>
    </HistoryProvider>
  );
}