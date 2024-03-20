import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Image, StyleSheet } from 'react-native';
import styles from './styles';
// import TaskList from '../TaskList/index.js';
import DailyTab from '../../screens/DailyTab/index.js';
import WeeklyTab from '../../screens/WeeklyTab/index.js';
import MonthlyTab from '../../screens/MonthlyTab/index.js';

const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'];

// const getGreetingMessage = () => {
//   const currentTime = new Date().getHours();
//   if (currentTime < 12) {
//     return 'Good morning';
//   } else if (currentTime >= 12 && currentTime < 18) {
//     return 'Good afternoon';
//   } else {
//     return 'Good evening';
//   }
// };

const TabViewNavigation = () => {
  const [selected, setSelected] = useState(0);
  // const [daynight, setDayNight] = useState('');
  // const [currentDate, setCurrentDate] = useState('');

  // useEffect(() => {
  //   setDayNight(getGreetingMessage());

  // //get the current date:
  // const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  // const today = new Date().toLocaleDateString('en-US', dateOptions);
  //   setCurrentDate(today);
  // },
  // []);

  const renderContent = () => {
    switch (selected) {
      case 0:
        return <DailyTab />;
      case 1:
        return <WeeklyTab />;
      case 2:
        return <MonthlyTab />;
      default:
        return null;
    }
  };

  const DailyContent = () => {
    return DailyTab
  };

  const WeeklyContent = () => {
    return WeeklyTab
  };

  const MonthlyContent = () => {
    return MonthlyTab
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

      {renderContent()}
      {/* <View style={styles.containerInformationToday}>
          <View style={styles.greetContainer}>
            <Text style={styles.greetHeader}>{String(daynight)}</Text>

            <Text style={[styles.greetHeader, {fontWeight: 'bold', marginLeft: -35}]}>John</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight:'bold', fontSize: 25, color: '#7646FF', marginLeft: 20}}>TODAY</Text>
            <Text style={{fontSize:20, color: '#4CD964', alignItems: 'flex-end', marginRight: 20}}>Completed</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight:'bold', fontSize:26, marginLeft: 20, marginTop: 10}}>{currentDate}</Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 85, color: '#4CD964'}}>4/</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>10</Text>
            </View>

          </View>
      </View> */}
      {/* <TaskList/> */}
    </View>
  );
};

export default TabViewNavigation;

