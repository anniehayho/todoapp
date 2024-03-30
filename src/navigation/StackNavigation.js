import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from '../navigation/DrawerNavigation';
import LoginScreen from '../screens/LoginScreen';
import NewTaskScreen from '../screens/NewTaskScreen';
import ImportantTaskScreen from '../screens/ImportantTaskScreen';
import DoneTaskScreen from '../screens/DoneTaskScreen';
import LaterTaskScreen from '../screens/LaterTaskScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SettingScreen from '../screens/SettingScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewTaskScreen" component={NewTaskScreen}/>
      <Stack.Screen name="ImportantTaskScreen" component={ImportantTaskScreen}/>
      <Stack.Screen name="DoneTaskScreen" component={DoneTaskScreen}/>
      <Stack.Screen name="LaterTaskScreen" component={LaterTaskScreen}/>
      <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
      <Stack.Screen name="SettingScreen" component={SettingScreen}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;
