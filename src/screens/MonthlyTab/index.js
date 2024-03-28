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

  return (
    <View style={styles.containerMonthlyTab}>
      <View style={styles.monthlyTab}>
          <MonthlyCalendar/>
      </View>

      <View style={styles.containerMonthlyContent}>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={taskData}
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