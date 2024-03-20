import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Image, StyleSheet } from 'react-native';
import styles from './styles';
import TaskList from '../../components/TaskList';

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

  useEffect(() => {
    setDayNight(getGreetingMessage());

  //get the current date:
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', dateOptions);
    setCurrentDate(today);
  },
  []);

  return (
    <View>
      <View style={styles.containerInformationToday}>
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
      </View>
      <TaskList/>
    </View>
  )
}

export default DailyTab