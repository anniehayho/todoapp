import React, { useState, useEffect } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import PropTypes from 'prop-types'
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
import { getAuth, signOut } from 'firebase/auth'
import { firebase_app } from '../../firebase/firebaseConfig'

const CustomDrawerContentScreen = ({navigation}) => {   
  const auth = getAuth(firebase_app);
  const [userInfo, setUserInfo] = useState({
    displayName: auth.currentUser.displayName || 'User',
    email: auth.currentUser.email || '',
  });

  useEffect(() => {
    // Get current user info
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserInfo({
        displayName: currentUser.displayName || 'User',
        email: currentUser.email || '',
      });
    }
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.containerMenuScreen}>
        <View style={styles.containerProfile}>
          <View style={styles.containerAvatar}>
            <Image source={shadowBox} style={[styles.shadowBox]}/>
            <Image source={userAvatar} style={[styles.userAvatar]}/>
          </View> 
          <View style={styles.infoContainer}>
            <Text style={styles.displayName}>{userInfo.displayName}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>
        </View>

        <View style={styles.containerMenuBar}>
          <CustomBox text="Add Task" leftIcon={newTaskIcon} onPress={() => navigateToScreen('NewTaskScreen')}/>
          <CustomBox text="Important" leftIcon={starIcon} onPress={() => navigateToScreen('ImportantTaskScreen')}/>
          <CustomBox text="Done" leftIcon={doneTaskIcon} onPress={() => navigateToScreen('DoneTaskScreen')}/>
          <CustomBox text="Later" leftIcon={laterTaskIcon} onPress={() => navigateToScreen('LaterTaskScreen')}/>
          <CustomBox text="Category" leftIcon={categoryIcon} onPress={() => navigateToScreen('CategoryScreen')}/>
          <CustomBox text="Setting" leftIcon={settingIcon} onPress={() => navigateToScreen('SettingScreen')}/>
          <CustomBox text="Logout" leftIcon={logoutIcon} onPress={handleLogout}/>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

CustomDrawerContentScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired
}

export default CustomDrawerContentScreen