import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles'

const CustomLogin = ({ onPress, imageSource }) => {
  return (
    <View>
      <Pressable onPress={() => onPress()} style={styles.container}>
        <Image source={imageSource} style={styles.logo} />
      </Pressable>
    </View>
  );
};

export default CustomLogin;