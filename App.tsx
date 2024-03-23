/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import NewTaskScreen from './src/screens/NewTaskScreen';
import ImportantTaskScreen from './src/screens/ImportantTaskScreen';
import DoneTaskScreen from './src/screens/DoneTaskScreen';
import LaterTaskScreen from './src/screens/LaterTaskScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import SettingScreen from './src/screens/SettingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewTaskScreen" component={NewTaskScreen}/>
        <Stack.Screen name="DoneTaskScreen" component={DoneTaskScreen}/>
        <Stack.Screen name="LaterTaskScreen" component={LaterTaskScreen}/>
        <Stack.Screen name="ImportantTaskScreen" component={ImportantTaskScreen}/>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
        <Stack.Screen name="SettingScreen" component={SettingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
