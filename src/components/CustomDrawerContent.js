// CustomDrawerContent.js
import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const { state } = navigation;

  return (
    <View>
      {state.routes.map((route, index) => {
        if (route.name !== "HomeScreen") {
          return (
            <View key={route.key}>
              <Text style={{ padding: 16, color: 'black' }}>
                {route.name}
              </Text>
            </View>
          );
        }
      })}
    </View>
  );
};

const Drawer = createDrawerNavigator();
export default CustomDrawerContent;