/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './src/screens/LoginScreen';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
