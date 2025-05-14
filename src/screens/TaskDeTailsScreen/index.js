import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, Alert } from 'react-native'
import styles from './styles'
import backIcon from '@assets/images/backIcon.png'
import bellIcon from '@assets/images/bellIcon.png'
import searchIcon from '@assets/images/searchIcon.png'
import plusIcon from '@assets/images/plusIcon.png'
import deleteTaskIcon from '@assets/images/deleteTaskIcon.png'
import editTaskIcon from '@assets/images/editTaskIcon.png'
import laterTaskIcon from '@assets/images/laterTaskIcon.png'
import doneTaskIcon from '@assets/images/doneTaskIcon.png'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import moment from 'moment'

const TaskDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { task } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handleDeleteTask = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            setLoading(true);
            dispatch({ 
              type: 'DELETE_TASK_REQUEST', 
              payload: task.id,
              onSuccess: () => {
                navigation.goBack();
              }
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleMarkAsDone = () => {
    setLoading(true);
    dispatch({ 
      type: 'MARK_TASK_DONE_REQUEST', 
      payload: task,
      onSuccess: () => {
        Alert.alert("Success", "Task marked as done");
        navigation.navigate('DoneTaskScreen');
      }
    });
  };

  const handleMarkAsLater = () => {
    setLoading(true);
    dispatch({ 
      type: 'MARK_TASK_LATER_REQUEST', 
      payload: task,
      onSuccess: () => {
        Alert.alert("Success", "Task marked for later");
        navigation.navigate('LaterTaskScreen');
      }
    });
  };

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const onBackPressed = () => {
    navigation.goBack();
  }

  const navigateToEditTaskScreen = () => {
    navigation.navigate('EditTaskScreen', { task });
  }
  
  const formatTaskTime = (timeString) => {
    return moment(timeString, 'HH:mm').format('hh:mm A');
  }

  const formatTaskDate = (dateString) => {
    // Handle different date formats
    if (!dateString) return '';
    
    if (typeof dateString === 'string') {
      if (dateString.includes('||')) {
        // Format: DD-MM-YYYY || HH:MM
        return dateString.split('||')[0].trim();
      } else if (dateString.includes(',')) {
        // Format: "Wednesday, 20 March, 2024"
        return moment(dateString, 'dddd, DD MMMM, YYYY').format('DD-MMMM-YYYY');
      } else if (dateString.includes('-')) {
        // Format: "2024-03-20"
        return moment(dateString).format('DD-MMMM-YYYY');
      }
    }
    
    // If it's a timestamp or Firestore Timestamp
    if (task.dateTime && task.dateTime.toDate) {
      return moment(task.dateTime.toDate()).format('DD-MMMM-YYYY');
    }
    
    return dateString;
  }

  // Render loading state if necessary
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Processing...</Text>
      </View>
    );
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

        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <View style={styles.searchBar}>
            <TextInput style={styles.searchInput} placeholder='Search Task'/>
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerInformationTaskBox}>
        <Text style={styles.titleTask}>{task ? task.taskName : 'Task Name'}</Text> 
        <Text style={styles.datetimeTask}>
          {task ? `${task.date || formatTaskDate(task.title || '')} | ${task.time || formatTaskTime(task.time || '')}` : 'Date Time'}
        </Text>
        <Text style={styles.descriptionTask}>{task ? task.description : 'Description'}</Text>
        <View style={styles.categoryTask}>
          <Text style={styles.categoryTitle}>Category: </Text>
          <Text style={{ marginTop: 15 }}>{task ? task.type : 'Category'}</Text>
        </View>

        {task && task.priority && (
          <View style={styles.categoryTask}>
            <Text style={styles.categoryTitle}>Priority: </Text>
            <Text style={{ marginTop: 15 }}>
              {task.priority === "1" ? "High" : 
               task.priority === "2" ? "Medium" : 
               task.priority === "3" ? "Normal" : "Low"}
            </Text>
          </View>
        )}

        {task && task.status && (
          <View style={styles.categoryTask}>
            <Text style={styles.categoryTitle}>Status: </Text>
            <Text style={{ marginTop: 15, fontWeight: 'bold', color: 
              task.status === 'Done' ? '#4CD964' : 
              task.status === 'Later' ? '#FF3B30' : '#7646FF' 
            }}>
              {task.status}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.containerTaskDetailsNavigation}>
        <TouchableOpacity onPress={handleDeleteTask}>
          <Image source={deleteTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToEditTaskScreen}>
          <Image source={editTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMarkAsLater}>
          <Image source={laterTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMarkAsDone}>
          <Image source={doneTaskIcon} style={styles.iconBarNavigation} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskDetailsScreen;