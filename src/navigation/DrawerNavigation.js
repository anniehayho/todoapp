import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContentScreen from '@screens/CustomDrawerContentScreen';
import HomeScreen from '@screens/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContentScreen {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation