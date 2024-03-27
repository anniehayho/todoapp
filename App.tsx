/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
}

export default App;
