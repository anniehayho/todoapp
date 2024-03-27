import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './styles'

const CustomBox = ({onPress, text, leftIcon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.customButton}>
          <Image source={leftIcon} style={styles.icon}/>
          <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomBox