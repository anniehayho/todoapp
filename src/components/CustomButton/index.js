import { Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

// eslint-disable-next-line react/prop-types
const CustomButton = ({ onPress, text, customStyle, customText }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, customStyle]}>
        <Pressable>
            <Text style={[styles.text, customText]}>{text}</Text>
        </Pressable>
    </TouchableOpacity>
  )
};

export default CustomButton;