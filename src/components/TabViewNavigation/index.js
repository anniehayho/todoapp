import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import WeeklyTab from '../../screens/WeeklyTab/index.js';
import MonthlyTab from '../../screens/MonthlyTab/index.js';
import NoTaskScreen from '../../screens/NoTaskScreen/index.js';
import DailyTab from '../../screens/DailyTab/index.js';
import taskData from '../../components/TaskData/taskData.js';

const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'];

const TabViewNavigation = () => {
  const [selected, setSelected] = useState(0);

  const todayTasks = taskData.filter(item => item.title === new Date().toDateString());
  const hasTasks = todayTasks.length > 0;

  const renderContent = () => {
    if (!hasTasks) {
      return <NoTaskScreen />;
    } else {
      switch (selected) {
        case 0:
          return <DailyTab data={todayTasks[0].data} />;
        case 1:
          return <WeeklyTab />;
        case 2:
          return <MonthlyTab />;
        default:
          return null;
      }
    }
  };

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
      {renderContent()}
      </View>
    </View>
  );
};

export default TabViewNavigation;

