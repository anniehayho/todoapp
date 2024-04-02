/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'
import React from 'react'
import styles from './styles'
import backIcon from '../../assets/images/backIcon.png'
import bellIcon from '../../assets/images/bellIcon.png'
import searchIcon from '../../assets/images/searchIcon.png'
import plusIcon from '../../assets/images/plusIcon.png'
import deleteTaskIcon from '../../assets/images/deleteTaskIcon.png'
import editTaskIcon from '../../assets/images/editTaskIcon.png'
import laterTaskIcon from '../../assets/images/laterTaskIcon.png'
import doneTaskIcon from '../../assets/images/doneTaskIcon.png'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'

const TaskDetailsScreen = ({ route }) => {

  const navigation = useNavigation();
  const { task } = route.params;

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const onBackPressed = () => {
    navigation.goBack('HomeScreen');
  }

  const navigateToHomeScreen = () => {
    navigation.goBack('HomeScreen')
  }

  const navigateToLaterTaskScreen = () => {
    navigation.navigate('LaterTaskScreen')
  }

  const navigateToDoneTaskScreen = (item) => {
    navigation.navigate('DoneTaskScreen'),
    console.log('Item pressed:', item);
  }

  const navigateToEditTaskScreen = () => {
    navigation.navigate('EditTaskScreen', { task });
  }
  
  const formatTaskTime = (task) => {
    const formatedTaskTime = moment(task.time, 'HH:mm').format('hh:mm A')
    // console.log(task)
    return formatedTaskTime
  }

  // const formatTaskDate = (task) => {
  //   const dateString = task.title;
  //   const formattedTaskDate = moment(dateString, 'dddd, DD MMMM, YYYY').format('DD-MMMM-YYYY');
  //   console.log(formattedTaskDate)
  //   return formattedTaskDate;
  // }

  return (
    <View style={styles.containerTaskDetailsScreen}>
      <View style={styles.headerTaskDetailsScreen}>

        <StatusBar barStyle={'light-content'} />

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPressed}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Task Details</Text>
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

        <View style={{ padding: 20 }}>
          <View style={styles.searchBar}>
            <TextInput style={{ width: '90%' }} placeholder='Search Task' />
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerInformationTaskBox}>
        <Text style={styles.titleTask}>{task.taskName}</Text>
        <Text style={styles.datetimeTask}>{task.title} | {formatTaskTime(task)} </Text>
        <Text style={styles.descriptionTask}>{task.description}</Text>
        <View style={styles.categoryTask}>
          <Text style={styles.categoryTitle}>Category: </Text>
          <Text style={{ marginTop: 15 }}>{task.type}</Text>
        </View>
      </View>

      <View style={styles.containerTaskDetailsNavigation}>
        <TouchableOpacity onPress={navigateToHomeScreen}>
          <Image source={deleteTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToEditTaskScreen}>
          <Image source={editTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToLaterTaskScreen}>
          <Image source={laterTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToDoneTaskScreen}>
          <Image source={doneTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskDetailsScreen;
