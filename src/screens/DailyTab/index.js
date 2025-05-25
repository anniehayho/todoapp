// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TaskList from '@components/TaskList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
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

const DailyTab = ({ searchQuery }) => {
  const [daynight, setDayNight] = useState(getGreetingMessage());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dailyTasks = useSelector((state) => state.task.dailyTasks);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const auth = getAuth(firebaseConfig.firebase_app);
  const [displayName, setDisplayName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Get user's display name
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName?.split(' ')[0] || '');
    }

    // Fetch tasks
    fetchTasks();

    // Set greeting and date
    setDayNight(getGreetingMessage());
    setCurrentDate(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }));
  }, []);

  const fetchTasks = () => {
    dispatch({ type: 'GET_DAILY_TASKS_REQUEST' });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTasks();
    setDayNight(getGreetingMessage());
    setCurrentDate(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
    return (
      <SwipeRow
        disableRightSwipe={item.status === 'Done'}
        disableLeftSwipe={item.status === 'Done'}
        leftOpenValue={item.status === 'Done' ? 0 : 126}
        rightOpenValue={item.status === 'Done' ? 0 : -115}
      >
        {/* Hidden row */}
        <View style={styles.hiddenItemContainer}>
          {item.status !== 'Done' && (
            <>
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
            </>
          )}
        </View>
        
        {/* Front row */}
        <TaskList item={item} onPressItem={handlePressItem} />
      </SwipeRow>
    );
  };

  // Get the tasks array safely
  const tasksList = dailyTasks?.data || [];

  // Filter tasks by search query
  const filteredTasks = tasksList.filter(task => {
    if (!searchQuery) return true;
    return task.taskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter tasks by status for display
  const activeTasks = filteredTasks.filter(task => !task.status || (task.status !== 'Done' && task.status !== 'Later'));
  const laterTasks = filteredTasks.filter(task => task.status === 'Later');
  const todayDoneTasksFromDaily = filteredTasks.filter(task => task.status === 'Done');

  // Combine all tasks for display (active, later, and done)
  const displayTasks = [...activeTasks, ...laterTasks, ...todayDoneTasksFromDaily];

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
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View>
      {displayTasks.length === 0 && <NoTaskScreen/>}
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 85, color: '#4CD964' }}>{todayDoneTasksFromDaily.length}/</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{displayTasks.length}</Text>
          </View>
        </View>

        {/* {laterTasks.length > 0 && (
          <View style={{ marginTop: 10, marginLeft: 20 }}>
            <Text style={{ fontSize: 16, color: '#FF3B30', fontWeight: 'bold' }}>
              Later Tasks: {laterTasks.length}
            </Text>
          </View>
        )} */}
      </View>

      <SwipeListView
        style={styles.containerDailyContent}
        data={displayTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#7646FF']} // Color of the refresh indicator
            tintColor={'#7646FF'} // Color of the refresh indicator for iOS
          />
        }
      />
    </View>
  );
};

DailyTab.propTypes = {
  searchQuery: PropTypes.string
};

export default DailyTab;

