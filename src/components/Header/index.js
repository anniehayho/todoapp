import { View, Text, StatusBar, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './styles'
import menuIcon from '../../assets/images/menuIcon.png'
import appIcon from '../../assets/images/appIcon.png'
import bellIcon from '../../assets/images/bellIcon.png'
import plusIcon from '../../assets/images/plusIcon.png'
import searchIcon from '../../assets/images/searchIcon.png'
import TabViewNavigation from '../TabViewNavigation'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import DrawerMenu from '../DrawerMenu'

const Drawer = createDrawerNavigator();

const Header = () => {

  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer(DrawerMenu));
  };

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen'); 
  };


  return (
    <View style={styles.containerHeader}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={openDrawer}>
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Things</Text>
            <Text style={{fontWeight: 'bold'}}>TOD</Text>
            <View>
              <Image source={appIcon} style={styles.appIcon} />
            </View>
          </Text>

          <TouchableOpacity>
              <Image source={bellIcon} style={styles.bellIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToNewTaskScreen}>
              <Image source={plusIcon} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        <View style={{padding: 20}}>
          <View style={styles.searchBar}>
            <TextInput style={{width: '90%'}}placeholder='Search Task'/>
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
        </View>

        <TabViewNavigation/>
    </View>
  )
}

export default Header;