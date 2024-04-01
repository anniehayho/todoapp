import { View, SectionList, Text } from 'react-native';
import React from 'react';
import styles from './styles'
import taskData from '../../components/TaskData/taskData';
import moment from 'moment';
import TaskList from '../../components/TaskList';
import MonthlyCalendar from '../../components/MonthlyCalendar';
import { useNavigation } from '@react-navigation/native';

const getSectionTitle = (date) => {
  if (moment(date).isSame(moment(), 'day')) {
    return 'Today';
  } else {
    return moment(date).format('DD MMMM');
  }
};

const MonthlyTab = () => {
  const navigation = useNavigation();

  const filteredTaskData = taskData.filter(day => moment(day.title, 'dddd, DD MMMM, YYYY').isSameOrBefore(moment(), 'day'));
  filteredTaskData.sort((a, b) => moment(b.title, 'dddd, DD MMMM, YYYY').diff(moment(a.title, 'dddd, DD MMMM, YYYY')));

  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', {task});
  }

  return (
    <View style={styles.containerMonthlyTab}>
      <View style={styles.monthlyTab}>
          <MonthlyCalendar/>
      </View>

      <View style={styles.containerMonthlyContent}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={filteredTaskData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TaskList item={item} onPressItem={handlePressItem}/>
          )}

          renderSectionHeader={({ section }) => ( 
            <View>
              <Text style={styles.titleSectionList}>{getSectionTitle(section.title)}</Text>
            </View>
          )}
        />
      </View>
    </View>
    
  );
};

export default MonthlyTab;
