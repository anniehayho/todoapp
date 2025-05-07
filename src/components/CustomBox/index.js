import { Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import styles from './styles'

// eslint-disable-next-line react/prop-types
const CustomBox = ({onPress, text, leftIcon}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.customButton}>
          <Image source={leftIcon} style={styles.icon}/>
          <Text style={styles.textButton}>{text}</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  )
}

export default CustomBox