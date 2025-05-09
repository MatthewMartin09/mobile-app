import   React                        from 'react'                         ;
import { NavigationContainer        } from '@react-navigation/native'      ;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider              } from 'react-native-paper'            ;

//Screens
import Signup from './Screens/Signup' ;
import Login from './Screens/Login' ;
import Dashbrd from './Screens/Dashbrd' ;
import Family from './Screens/Family' ;
import FamilyChat from './Screens/FamilyChat' ;
import FoodDetails from './Screens/FoodDetails' ;
import History from './Screens/History' ;
import Account from './Screens/Account' ;
import BottomTabs from './Navigation/BottomTabs' ;
import TutorialOverlay from './Screens/TutorialOverlay';
import { HistoryProvider } from './Screens/HistoryContext' ;
import Favorites from './Screens/Favorites';
import FoodDetails2 from './Screens/FoodDetails2';
import FoodDetails3 from './Screens/FoodDetails3';
import FoodDetails4 from './Screens/FoodDetails4';
import FoodDetails5 from './Screens/FoodDetails5';
import FoodDetails6 from './Screens/FoodDetails6'
import Profile from './Screens/Profile';
import HelpCenter from './Screens/HelpCenter';
import TermsConditions from './Screens/TermsConditions';
import ProfileFam from './Screens/ProfileFam';
import MealPlans from './Screens/MealPlans'

//Create Stack Navigator
const Stack = createNativeStackNavigator();

//Auth Stack (Signup & Login)
function AuthStack() {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Signup" component={Signup} />
  <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
  );
  }

//Main Stack (Dashboard & Other Screens)
function MainStack() {
  return (
  <Stack.Navigator initialRouteName="BtnNav" screenOptions={{ headerShown: false}}>
  <Stack.Screen name="BtnNav" component={BottomTabs} />
  <Stack.Screen name="Dashbrd" component={Dashbrd} />
  <Stack.Screen name="Family" component={Family} />
  <Stack.Screen name="FamilyChat" component={FamilyChat} />
  <Stack.Screen name="FoodDetails" component={FoodDetails} />
  <Stack.Screen name="FoodDetails2" component={FoodDetails2} />
  <Stack.Screen name="FoodDetails3" component={FoodDetails3} />
  <Stack.Screen name="FoodDetails4" component={FoodDetails4} />
  <Stack.Screen name="FoodDetails5" component={FoodDetails5} />
  <Stack.Screen name="FoodDetails6" component={FoodDetails6} />
  <Stack.Screen name="Favorites" component={Favorites} />
  <Stack.Screen name="History" component={History} />
  <Stack.Screen name="Account" component={Account} />
  <Stack.Screen name="Profile" component={Profile}/>
  <Stack.Screen name="ProfileFam" component={ProfileFam}/>
  <Stack.Screen name="HelpCenter" component={HelpCenter}/>
  <Stack.Screen name="TermsCondition" component={TermsConditions}/>
  <Stack.Screen name="Tutorial" component={TutorialOverlay} />
  <Stack.Screen name="MealPlans" component={MealPlans} />
  </Stack.Navigator>
  );
  }

//Final Navigation Structure
export default function MainComponent() {
  return (
  <PaperProvider>
  <HistoryProvider>
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Auth" component={AuthStack} />
  <Stack.Screen name="Main" component={MainStack} />
  </Stack.Navigator>
  </NavigationContainer>
  </HistoryProvider>
  </PaperProvider>
  );
  }