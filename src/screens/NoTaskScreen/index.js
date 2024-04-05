import { View, Image, Text } from 'react-native'
import React from 'react'
import noTaskIcon from '@assets/images/noTaskIcon.png'
import styles from './styles'
import moment from 'moment';
import taskData from '@components/TaskData/taskData';

const getNextDayFirstTaskDateTime = () => {
  for (let i = 1; i <= 7; i++) {
    const nextDay = moment().add(i, 'day').startOf('day');
    const nextDayTasks = taskData.find(day => moment(day.title, 'dddd, DD MMMM, YYYY').isSame(nextDay, 'day'));
    if (nextDayTasks && nextDayTasks.data.length > 0) {
      const sortedTasks = nextDayTasks.data.sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')));
      const firstTask = sortedTasks[0];
      const dateTime = moment(`${nextDayTasks.title} ${firstTask.time}`, 'dddd, DD MMMM, YYYY HH:mm').format('dddd hh:mm A');
      return dateTime;
    }
  }
  return 'No tasks';
}

const NoTaskScreen = () => {
  return (
    <View style={styles.containerNoTaskScreen}>
      <Image source={noTaskIcon} style={styles.noTaskIcon}/>
      <Text style={styles.textImage}>All Done For Now</Text>
      <View style={styles.textNextTime}>
        <Text style={{color: '#172735'}}>Next Task</Text>
        <Text style={{color: '#172735'}}>{getNextDayFirstTaskDateTime()}</Text>
      </View>
      <Text style={styles.textBellow}>Time for a Break</Text>
    </View>
  )
}

export default NoTaskScreen
