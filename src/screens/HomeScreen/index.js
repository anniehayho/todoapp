import { View, Text, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './styles'
import menuIcon from '@assets/images/menuIcon.png'
import appIcon from '@assets/images/appIcon.png'
import bellIcon from '@assets/images/bellIcon.png'
import plusIcon from '@assets/images/plusIcon.png'
import searchIcon from '@assets/images/searchIcon.png'
import TabViewNavigation from '@components/TabViewNavigation'
import 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const navigation = useNavigation()
  const loading = useSelector((state) => state.loading);

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const openDrawerMenu = () => {
    navigation.openDrawer()
  }

  return (
    <View style={styles.containerHome}>
      <Spinner visible={loading} />
    <View style={styles.containerHeader}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={openDrawerMenu}>
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Things</Text>
            <Text style={{ fontWeight: 'bold' }}>TOD</Text>
            <View>
              <Image source={appIcon} style={styles.appIcon} />
            </View>
          </Text>
          <View style={styles.containerIconHeaderBar}>
            <TouchableOpacity>
                <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToNewTaskScreen}>
                <Image source={plusIcon} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View style={styles.searchBar}>
            <TextInput style={{ width: '90%' }}placeholder='Search Task'/>
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
        </View>
        <TabViewNavigation/>
    </View>
    </View>
  )
}

export default HomeScreen
