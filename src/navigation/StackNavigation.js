import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from '@navigation/DrawerNavigation';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import NewTaskScreen from '@screens/NewTaskScreen';
import ImportantTaskScreen from '@screens/ImportantTaskScreen';
import DoneTaskScreen from '@screens/DoneTaskScreen';
import LaterTaskScreen from '@screens/LaterTaskScreen';
import CategoryScreen from '@screens/CategoryScreen';
import SettingScreen from '@screens/SettingScreen';
import HomeScreen from '@screens/HomeScreen';
import TaskDetailsScreen from '@screens/TaskDeTailsScreen';
import EditTaskScreen from '@screens/EditTaskScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebase_app } from '../firebase/firebaseConfig';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth(firebase_app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    
    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);
  
  if (initializing) return null;
  
  return (
    <Stack.Navigator 
      initialRouteName={user ? "DrawerNavigation" : "Login"} 
      screenOptions={{ headerShown: false }}
    >
      {user ? (
        <>
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NewTaskScreen" component={NewTaskScreen}/>
          <Stack.Screen name="ImportantTaskScreen" component={ImportantTaskScreen}/>
          <Stack.Screen name="DoneTaskScreen" component={DoneTaskScreen}/>
          <Stack.Screen name="LaterTaskScreen" component={LaterTaskScreen}/>
          <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
          <Stack.Screen name="SettingScreen" component={SettingScreen}/>
          <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen}/>
          <Stack.Screen name="EditTaskScreen" component={EditTaskScreen}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigation;