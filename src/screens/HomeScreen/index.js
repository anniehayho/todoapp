import { View, Text, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
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
import { getSize } from '../../helpers/responsive'

const HomeScreen = () => {
  const navigation = useNavigation()
  const loading = useSelector((state) => state.loading);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const openDrawerMenu = () => {
    navigation.openDrawer()
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.containerHome}>
      <Spinner visible={loading} />
      <View style={styles.containerHeader}>
        <StatusBar barStyle={'light-content'} backgroundColor="#7646FF" />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={openDrawerMenu} style={{padding: getSize.m(8)}}>
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            Things<Text style={{ fontWeight: 'bold' }}>TOD</Text>
            <Image source={appIcon} style={styles.appIcon} />
          </Text>

          <View style={styles.containerIconHeaderBar}>
            <TouchableOpacity style={{padding: 8}}>
              <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={{padding: 8}} onPress={navigateToNewTaskScreen}>
              <Image source={plusIcon} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchInput} 
            placeholder='Search Task'
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={searchQuery ? clearSearch : undefined}>
            <Image source={searchIcon} style={styles.searchIcon}/>
          </TouchableOpacity>
        </View>
      </View>
      <TabViewNavigation searchQuery={searchQuery} />
    </View>
  )
}

export default HomeScreen
