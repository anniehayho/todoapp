/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import NewTaskScreen from './src/screens/NewTaskScreen';
import ImportantTaskScreen from './src/screens/ImportantTaskScreen';
import DoneTaskScreen from './src/screens/DoneTaskScreen';
import LaterTaskScreen from './src/screens/LaterTaskScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import SettingScreen from './src/screens/SettingScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContentScreen from './src/screens/CustomDrawerContentScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

function Root() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContentScreen {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Drawer.Screen name="NewTask" component={NewTaskScreen} />
      <Drawer.Screen name="ImportantTask" component={ImportantTaskScreen} />
      <Drawer.Screen name="DoneTask" component={DoneTaskScreen} />
      <Drawer.Screen name="LaterTask" component={LaterTaskScreen} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} /> */}
    </Drawer.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Root" component={Root}/>
          <Stack.Screen name="NewTaskScreen" component={NewTaskScreen}/>
          <Stack.Screen name="ImportantScreen" component={ImportantTaskScreen}/>
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
  },
  
});

export default App;
