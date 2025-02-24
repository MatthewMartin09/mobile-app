import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import { Ionicons } from '@expo/vector-icons';

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
const dashName = 'Home';
const famName = 'Connect';
const chatName = 'Chat';
const fooddtl = 'FoodDetails';
const historyName = 'History';
const accName = 'Account';

// Create Stack and Tab Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home Screens
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={dashName} component={Dashbrd} />
      <Stack.Screen name={fooddtl} component={FoodDetails} />
      <Stack.Screen name={chatName} component={FamilyChat} />
    </Stack.Navigator>
  );
}

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
                iconName = focused ? 'people-outline' : 'people-outline';
              } else if (rn === accName) {
                iconName = focused ? 'person' : 'person';
              } else if (rn === historyName) {
                iconName = focused ? 'time-outline' : 'time-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
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
            headerShown: false,
          })}
        >
          <Tab.Screen name={dashName} component={HomeStack} />
          <Tab.Screen name={famName} component={Family} />
          <Tab.Screen name={historyName} component={History} />
          <Tab.Screen name={accName} component={Account} />
        </Tab.Navigator>
      </NavigationContainer>
    </HistoryProvider>
  );
}