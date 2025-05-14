// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import TaskList from '@components/TaskList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import donetaskIcon from '../../assets/images/doneTaskIcon.png'
import latertaskIcon from '../../assets/images/deleteTaskIcon.png'
import NoTaskScreen from '../NoTaskScreen';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase/firebaseConfig';

const getGreetingMessage = () => {
  const currentTime = new Date().getHours();
  if (currentTime < 12) {
    return 'Good morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const DailyTab = () => {
  const [daynight, setDayNight] = useState(getGreetingMessage());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dailyTasks = useSelector((state) => state.task.dailyTasks);
  const doneTasks = useSelector((state) => state.task.doneTasks);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const auth = getAuth(firebaseConfig.firebase_app);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    // Get user's display name
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName?.split(' ')[0] || '');
    }

    // Fetch tasks
    dispatch({ type: 'GET_DAILY_TASKS_REQUEST' });
    dispatch({ type: 'GET_DONE_TASKS_REQUEST' });

    // Set greeting and date
    setDayNight(getGreetingMessage());
    setCurrentDate(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }));
  }, []);

  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', { task });
  };

  const handleMarkTaskDone = (task) => {
    dispatch({ type: 'MARK_TASK_DONE_REQUEST', payload: task });
  };

  const handleMarkTaskLater = (task) => {
    dispatch({ type: 'MARK_TASK_LATER_REQUEST', payload: task });
  };

  const renderItem = ({item}) => {
    return <TaskList item={item} onPressItem={handlePressItem} />;
  };

  const renderHiddenItem = ({ item }) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          onPress={() => handleMarkTaskDone(item)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10, backgroundColor: '#4CD964', height: '100%' }}>
          <Image
            style={{ height: 30, width: 30, marginHorizontal: 10 }}
            source={donetaskIcon}
          />
          <Text style={{ fontSize: 20, color: '#fff', marginRight: 10 }}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMarkTaskLater(item)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10, backgroundColor: '#FF3B30', height: '100%' }}>
          <Image
            style={{ height: 30, width: 30, marginRight: 10 }}
            source={latertaskIcon}
          />
          <Text style={{ fontSize: 20, color: '#fff', marginRight: 10 }}>Later</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Get the tasks array safely
  const tasksList = dailyTasks?.data || [];
  const doneTasksList = doneTasks?.data || [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading tasks: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            dispatch({ type: 'GET_DAILY_TASKS_REQUEST' });
            dispatch({ type: 'GET_DONE_TASKS_REQUEST' });
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View>
      {tasksList.length === 0 && <NoTaskScreen/>}
      <View style={styles.containerInformationToday}>
        <View style={styles.greetContainer}>
          <Text style={styles.greetHeader}>{daynight}</Text>
          <Text style={[styles.greetHeader, { fontWeight: 'bold', marginLeft: -35 }]}>{displayName}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7646FF', marginLeft: 20 }}>TODAY</Text>
          <Text style={{ fontSize: 20, color: '#4CD964', alignItems: 'flex-end', marginRight: 20 }}>Completed</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 20, marginTop: 10 }}>{currentDate}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 85, color: '#4CD964' }}>{doneTasksList.length}/</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{tasksList.length + doneTasksList.length}</Text>
          </View>
        </View>
      </View>

      <SwipeListView
        style={styles.containerDailyContent}
        data={tasksList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={126}
        rightOpenValue={-115}
        disableRightSwipe={false}
        disableLeftSwipe={false}
      />
    </View>
  );
};

export default DailyTab;
