import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const CustomButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container }>
        <Pressable>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    </TouchableOpacity>
  )
};

export default CustomButton;