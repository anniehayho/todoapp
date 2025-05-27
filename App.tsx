/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import NotificationService from './src/services/NotificationService';

const App = () => {
  useEffect(() => {
    // Initialize notification service when app starts
    try {
      NotificationService.configure();
      console.log('Notification service initialized');
    } catch (error) {
      console.warn('Failed to initialize notification service:', error);
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </Provider>
    
  );
}

export default App;
