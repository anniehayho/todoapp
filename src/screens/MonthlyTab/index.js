import { View, SectionList, Text } from 'react-native';
import React from 'react';
import styles from './styles'
import taskData from '../../components/TaskData/taskData';
import moment from 'moment';
import TaskList from '../../components/TaskList';
import MonthlyCalendar from '../../components/MonthlyCalendar';

const getSectionTitle = (date) => {
  if (moment(date).isSame(moment(), 'day')) {
    return 'Today';
  } else {
    return moment(date).format('DD MMMM');
  }
};

const MonthlyTab = () => {
  // Lọc ra các task của ngày "Today" và các ngày trước đó
  const filteredTaskData = taskData.filter(day => moment(day.title, 'dddd, DD MMMM, YYYY').isSameOrBefore(moment(), 'day'));

  // Sắp xếp lại mảng filteredTaskData theo thứ tự giảm dần của các ngày
  filteredTaskData.sort((a, b) => moment(b.title, 'dddd, DD MMMM, YYYY').diff(moment(a.title, 'dddd, DD MMMM, YYYY')));

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
            <TaskList item={item} />
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
