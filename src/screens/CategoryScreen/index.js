
/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'
import React from 'react'
import styles from './styles'
import backIcon from '@assets/images/backIcon.png'
import bellIcon from '@assets/images/bellIcon.png'
import searchIcon from '@assets/images/searchIcon.png'
import plusIcon from '@assets/images/plusIcon.png'
import { useNavigation } from '@react-navigation/native';
import { getSize } from '../../helpers/responsive'

const CategoryScreen = () => {

  const navigation = useNavigation();

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const onBackPressed = () => {
    navigation.goBack('HomeScreen');
  }

  return (
    <View style={styles.containerTaskDetailsScreen}>
      <View style={styles.headerTaskDetailsScreen}>

        <StatusBar barStyle={'light-content'} />

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPressed}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Categories</Text>
          </Text>

          <View style={styles.containerIcon}>
            <TouchableOpacity>
              <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToNewTaskScreen}>
              <Image source={plusIcon} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <View style={styles.searchBar}>
            <TextInput style={styles.searchInput} placeholder='Search Task'/>
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerDoneTaskList}>
        <Text style={{ 
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#7646FF',
          marginTop: getSize.m(100),
        }}>CategoryScreen</Text>
        <Text style={{ 
          alignSelf: 'center',
          fontSize: 16,
          color: '#7646FF',
          marginTop: getSize.m(10),
        }}>Will be update soon</Text>
      </View>
    </View>
  )
}

export default CategoryScreen;
