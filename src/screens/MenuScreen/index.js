import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import styles from './styles'
import userAvatar from '../../assets/images/userAvatar.png'
import shadowBox from '../../assets/images/shadowBox.png'
import newTaskIcon from '../../assets/images/newTaskIcon.png'
import starIcon from '../../assets/images/starIcon.png'
import doneTaskIcon from '../../assets/images/doneTaskIcon.png'
import laterTaskIcon from '../../assets/images/laterTaskIcon.png'
import categoryIcon from '../../assets/images/categoryIcon.png'
import settingIcon from '../../assets/images/settingIcon.png'
import logoutIcon from '../../assets/images/logoutIcon.png'
import CustomBox from '../../components/CustomBox'
import { DrawerContentScrollView } from '@react-navigation/drawer'

const MenuScreen = (props) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.containerMenuScreen}>

      <View style={styles.containerProfile}>

        <View style={styles.containerAvatar}>
          <Image source={shadowBox} style={[styles.shadowBox]}/>
          <Image source={userAvatar} style={[styles.userAvatar]}/>
        </View>
        <Text style={styles.userName}>John Smith</Text>

      </View>

      <View style={styles.containerMenuBar}>
        <CustomBox text="Add Task" leftIcon={newTaskIcon}/>
        <CustomBox text="Important" leftIcon={starIcon}/>
        <CustomBox text="Done" leftIcon={doneTaskIcon}/>
        <CustomBox text="Later" leftIcon={laterTaskIcon}/>
        <CustomBox text="Category" leftIcon={categoryIcon}/>
        <CustomBox text="Setting" leftIcon={settingIcon}/>
        <CustomBox text="Logout" leftIcon={logoutIcon}/>
      </View>
      </View>
    </DrawerContentScrollView>
    
  )
}

export default MenuScreen