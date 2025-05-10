import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import TaskList from '@components/TaskList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { markTaskDone, markTaskLater } from '../../redux/tasksSlice';
import { SwipeListView } from 'react-native-swipe-list-view';
import donetaskIcon from '../../assets/images/doneTaskIcon.png'
import latertaskIcon from '../../assets/images/deleteTaskIcon.png'
import NoTaskScreen from '../NoTaskScreen';
import { firebase_app } from '../../firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
  const [daynight, setDayNight] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const dailyTasks = useSelector((state) => state.task.dailyTasks);
  const doneTasks = useSelector((state) => state.task.doneTasks);
  const auth = getAuth(firebase_app);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    dispatch({ type: 'GET_DAILY_TASKS_REQUEST' });
    setDayNight(getGreetingMessage());
    setCurrentDate(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }));
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', { task });
  };

  const handleMarkTaskDone = (task) => {
    dispatch(markTaskDone(task));
  };

  const handleMarkTaskLater = (task) => {
    dispatch(markTaskLater(task));
  };

  const renderItem = ({item}) => {
    return <TaskList item={item} onPressItem={handlePressItem} />;
  };

  const renderHiddenItem = ({ item }) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          onPress={() => handleMarkTaskDone(item)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10, backgroundColor: '#4CD964' }}>
          <Image
            style={{ height: 30, width: 30, marginHorizontal: 10 }}
            source={donetaskIcon}
          />
          <Text style={{ fontSize: 20, color: '#fff', marginRight: 10 }}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMarkTaskLater(item)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10, backgroundColor: '#FF3B30' }}>
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
        keyExtractor={(item, index) => index.toString()}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={126}
        rightOpenValue={-115}
      />
    </View>
  );
};

export default DailyTab;
