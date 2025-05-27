import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native';
import styles from './styles';
import backIcon from '@assets/images/backIcon.png';
import bellIcon from '@assets/images/bellIcon.png';
import plusIcon from '@assets/images/plusIcon.png';
import { useNavigation } from '@react-navigation/native';
import TaskList from '@components/TaskList';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const DoneTaskScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const doneTasks = useSelector(state => state.task.doneTasks);
  const loading = useSelector(state => state.loading);
  const [searchQuery] = useState('');

  useEffect(() => {
    dispatch({ type: 'GET_DONE_TASKS_REQUEST' });
  }, []);

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen');
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', { task });
  };

  const renderItem = ({ item }) => (
    <TaskList item={item} onPressItem={() => handlePressItem(item)} />
  );

  const formatDate = (dateString) => {
    const date = moment(dateString);
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
  
    if (date.isSame(today, 'day')) {
      return 'Today';
    } else if (date.isSame(yesterday, 'day')) {
      return 'Yesterday';
    } else {
      return date.format('dddd, MMMM D, YYYY');
    }
  };

  // Group tasks by date with search filtering
  const groupTasksByDate = () => {
    if (!doneTasks.data || !Array.isArray(doneTasks.data)) {
      return [];
    }

    // Apply search filter first
    const filteredTasks = searchQuery ? 
      doneTasks.data.filter(task => 
        task.taskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) : doneTasks.data;

    const grouped = {};
    
    filteredTasks.forEach(task => {
      let dateKey;
      
      if (task.dateTime && task.dateTime.toDate) {
        // Firestore Timestamp
        dateKey = moment(task.dateTime.toDate()).format('YYYY-MM-DD');
      } else if (task.date) {
        // String date format: DD-MM-YYYY
        const [day, month, year] = task.date.split('-');
        dateKey = `${year}-${month}-${day}`;
      } else {
        // Fallback
        dateKey = 'No Date';
      }
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      
      grouped[dateKey].push(task);
    });
    
    // Convert to array format needed for FlatList
    return Object.keys(grouped)
      .sort((a, b) => moment(b).diff(moment(a))) // Sort dates in descending order
      .map(date => ({
        title: date,
        data: grouped[date]
      }));
  };

  return (
    <View style={styles.containerTaskDetailsScreen}>
      <View style={styles.headerTaskDetailsScreen}>
        <StatusBar barStyle={'light-content'} backgroundColor="#7646FF" />
        <View style={styles.headerBar}>
          <TouchableOpacity 
            onPress={onBackPressed}
            style={{padding: 8}}
          >
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>Done Tasks</Text>

          <View style={styles.containerIcon}>
            <TouchableOpacity style={{padding: 8}}>
              <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 8}} onPress={navigateToNewTaskScreen}>
              <Image source={plusIcon} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerDoneTaskList}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading completed tasks...</Text>
          </View>
        ) : doneTasks.data && doneTasks.data.length > 0 ? (
          <FlatList 
            data={groupTasksByDate()}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View style={styles.showDoneTaskList}>
                <View style={styles.dateHeader}> 
                  <Text style={styles.textHeader}>{formatDate(item.title)}</Text>
                </View>
                <FlatList
                  style={styles.doneTaskList}
                  data={item.data}
                  keyExtractor={(task) => task.id}
                  renderItem={renderItem}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No completed tasks yet</Text>
            <TouchableOpacity 
              style={styles.addTaskButton}
              onPress={navigateToNewTaskScreen}
            >
              <Text style={styles.addTaskButtonText}>Add a new task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default DoneTaskScreen;