import { View, Image, Text } from 'react-native'
import React from 'react'
import noTaskIcon from '../../assets/images/noTaskIcon.png'
import styles from './styles'

const NoTaskScreen = () => {
  return (
    <View style={styles.containerNoTaskScreen}>
      <Image source={noTaskIcon} style={styles.noTaskIcon}/>
      <Text style={styles.textImage}>All Done For Now</Text>
      <View style={styles.textNextTime}>
        <Text style={{color: '#172735'}}>Next Task</Text>
        <Text style={{color: '#172735'}}>Tomorrow 3:55PM</Text>
      </View>
      
      <Text style={styles.textBellow}>Time for a Break</Text>
    </View>
  )
}

export default NoTaskScreen