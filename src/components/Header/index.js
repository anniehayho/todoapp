import { View, Text, StatusBar, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './styles'
import menuIcon from '../../assets/images/menuIcon.png'
import appIcon from '../../assets/images/appIcon.png'
import bellIcon from '../../assets/images/bellIcon.png'
import plusIcon from '../../assets/images/plusIcon.png'
import CustomInput from '../CustomInput'
import searchIcon from '../../assets/images/searchIcon.png'
import TabViewNavigation from '../TabViewNavigation'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Header = () => {
  return (
    <View style={styles.containerHeader}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.headerBar}>
          <TouchableOpacity>
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

          <TouchableOpacity>
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