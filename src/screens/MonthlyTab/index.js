import { View, SectionList, Text } from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles'
import moment from 'moment';
import TaskList from '@components/TaskList';
import MonthlyCalendar from '@components/MonthlyCalendar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const getSectionTitle = (date) => {
  if (moment(date).isSame(moment(), 'day')) {
    return 'Today';
  } else {
    return moment(date).format('DD MMMM');
  }
};

const MonthlyTab = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const monthlyTasksData = useSelector((state) => state.task.monthlyTasks)
  useEffect(() => {
    dispatch({ type: 'GET_MONTHLY_TASKS_REQUEST' });
  }, []);
  
  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', {task});
  }

  return (
    <View style={styles.containerMonthlyTab}>
      <View style={styles.monthlyTab}>
          <MonthlyCalendar/>
      </View>

      <View style={styles.containerMonthlyContent}>
      {Array.isArray(monthlyTasksData) && monthlyTasksData.length > 0 && (
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={monthlyTasksData}
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
      )}
      </View>
    </View>
    
  );
};

export default MonthlyTab;
