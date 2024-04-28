import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import WeeklyTab from '@screens/WeeklyTab/index.js';
import MonthlyTab from'@screens/MonthlyTab/index.js';
import NoTaskScreen from '@screens/NoTaskScreen/index.js';
import DailyTab from '@screens/DailyTab/index.js';
import { useDispatch, useSelector } from 'react-redux';
import LoaderKit from 'react-native-loader-kit';

const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'];

const TabViewNavigation = () => {
  const tasks = useSelector((state) => state.task);
  const loading = useSelector((state) => state.task.loading);
  const [selected, setSelected] = useState(0);
  const renderContent = () => {
    switch (selected) {
      case 0:
        if (tasks.dailyTasks && tasks.dailyTasks.data.length > 0) {
          return <DailyTab />;
        } else {
          return <NoTaskScreen />;
        }
      case 1:
        return <WeeklyTab />;
      case 2:
        return <MonthlyTab />;
      default:
        return null;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'GET_DAILY_TASKS_REQUEST'})
    dispatch({type: 'GET_WEEKLY_TASKS_REQUEST'}),
    dispatch({type: 'GET_MONTHLY_TASKS_REQUEST'})
  },[]);

  return (
    <View style={styles.containerTabView}>
      <View style={styles.containerSubTabView}>
        {tabs.map((e, i) => (
          <Pressable key={i} 
            onPress={() => setSelected(i)}
            style={styles.tabItem}>
            <Text style={[styles.titleTabView, selected === i && {fontWeight: 'bold'}]}>{e}</Text> 
            {selected === i && <View style={styles.lineTabView} />}
          </Pressable>  
        ))}
      </View>
      <View style={styles.containerRenderContent}>
      {loading ? renderContent() : <LoaderKit style={{ width: 50, height: 50 }} name={'BallPulse'} color={'red'}/>}
      </View>
    </View>
  );
};

export default TabViewNavigation;

