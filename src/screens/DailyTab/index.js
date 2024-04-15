import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import TaskList from '@components/TaskList';
import taskData from '@components/TaskData/taskData.js';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_daily_tasks_success } from '../../redux/tasksSlice';

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
  const dailyTasks = useSelector((state) => state.task.dailyTasks)
  useEffect(() => {
    setDayNight(getGreetingMessage());
  
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    setCurrentDate(currentDateString);

    const todayTasks = taskData.find(day => {
      const taskDate = new Date(day.title);
      const taskDateString = taskDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
      return taskDateString === currentDateString;
    });
  
    dispatch(get_daily_tasks_success(todayTasks.data))
  }, []);

  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', { task });
  };

  const renderItem = ({ item }) => {
    return <TaskList item={item} onPressItem={handlePressItem} />;
  };

  return (
    <View>
      <View style={styles.containerInformationToday}>
        <View style={styles.greetContainer}>
          <Text style={styles.greetHeader}>{daynight}</Text>
          <Text style={[styles.greetHeader, { fontWeight: 'bold', marginLeft: -35 }]}>John</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#7646FF', marginLeft: 20 }}>TODAY</Text>
          <Text style={{ fontSize: 20, color: '#4CD964', alignItems: 'flex-end', marginRight: 20 }}>Completed</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 26, marginLeft: 20, marginTop: 10 }}>{currentDate}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 85, color: '#4CD964' }}>4/</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>10</Text>
          </View>
        </View>
      </View>

      <FlatList
        style={styles.containerDailyContent}
        data={dailyTasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DailyTab;
