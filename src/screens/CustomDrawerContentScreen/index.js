/* eslint-disable react/prop-types */
import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import userAvatar from '@assets/images/userAvatar.png'
import shadowBox from '@assets/images/shadowBox.png'
import newTaskIcon from '@assets/images/newTaskIcon.png'
import starIcon from '@assets/images/starIcon.png'
import doneTaskIcon from '@assets/images/doneTaskIcon.png'
import laterTaskIcon from '@assets/images/laterTaskIcon.png'
import categoryIcon from '@assets/images/categoryIcon.png'
import settingIcon from '@assets/images/settingIcon.png'
import logoutIcon from '@assets/images/logoutIcon.png'
import CustomBox from '@components/CustomBox'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/userSlice'
import { firebase_app } from '../../firebase/firebaseConfig'
import { getAuth } from 'firebase/auth'

const CustomDrawerContentScreen = ({navigation}) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const auth = getAuth(firebase_app);
  const email = auth.currentUser.email;

  const dispatch = useDispatch()

  console.log(auth.user);
  const handleLogout = () => {
    dispatch(logout())
    navigation.navigate('Login');
  }

  return (
    <DrawerContentScrollView>
      <View style={styles.containerMenuScreen}>

        <View style={styles.containerProfile}>
          <View style={styles.containerAvatar}>
            <Image source={shadowBox} style={[styles.shadowBox]}/>
            <Image source={userAvatar} style={[styles.userAvatar]}/>
          </View> 
          <Text style={styles.email}>{email}</Text>
        </View>

      <View style={styles.containerMenuBar}>
        <CustomBox text="Add Task" leftIcon={newTaskIcon} onPress={() => navigateToScreen('NewTaskScreen')}/>
        <CustomBox text="Important" leftIcon={starIcon} onPress={() => navigateToScreen('ImportantTaskScreen')}/>
        <CustomBox text="Done" leftIcon={doneTaskIcon} onPress={() => navigateToScreen('DoneTaskScreen')}/>
        <CustomBox text="Later" leftIcon={laterTaskIcon} onPress={() => navigateToScreen('LaterTaskScreen')}/>
        <CustomBox text="Category" leftIcon={categoryIcon} onPress={() => navigateToScreen('CategoryScreen')}/>
        <CustomBox text="Setting" leftIcon={settingIcon} onPress={() => navigateToScreen('SettingScreen')}/>
        <CustomBox text="Logout" leftIcon={logoutIcon} onPress={() => handleLogout()}/>
      </View>
      </View>
    </DrawerContentScrollView>
    
  )
}

export default CustomDrawerContentScreen
