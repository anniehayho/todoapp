import { View, Text, SectionList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import moment from 'moment';
import TaskList from '@components/TaskList';
import WeeklyCalendar from '@components/WeeklyCalendar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const getSectionTitle = (date) => {
  if (moment(date).isSame(moment(), 'day')) {
    return 'Today';
  } else {
    return moment(date).format('DD MMMM');
  }
};

const WeeklyTab = ({ searchQuery }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const weeklyTasksData = useSelector((state) => state.task.weeklyTasks);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWeeklyTasks();
  }, []);

  const fetchWeeklyTasks = () => {
    dispatch({ type: 'GET_WEEKLY_TASKS_REQUEST' });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchWeeklyTasks();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePressItem = (task) => {
    navigation.navigate('TaskDetailsScreen', { task });
  };

  // Filter weekly tasks based on search query
  const filteredWeeklyTasks = React.useMemo(() => {
    if (!weeklyTasksData?.data || !searchQuery) {
      return weeklyTasksData;
    }

    const filteredData = weeklyTasksData.data.map(section => ({
      ...section,
      data: section.data.filter(task => 
        task.taskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.data.length > 0);

    return { ...weeklyTasksData, data: filteredData };
  }, [weeklyTasksData, searchQuery]);

  return (
    <View style={styles.containerWeeklyTab}>
      <View style={styles.weeklyTab}>
        <WeeklyCalendar />
      </View>

      <View style={styles.containerWeeklyContent}>
        {filteredWeeklyTasks && filteredWeeklyTasks.data && Array.isArray(filteredWeeklyTasks.data) && filteredWeeklyTasks.data.length > 0 && (
          <SectionList
            stickySectionHeadersEnabled={false}
            sections={filteredWeeklyTasks.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TaskList item={item} onPressItem={handlePressItem} />
            )}
            renderSectionHeader={({ section }) => (
              <View>
                <Text style={styles.titleSectionList}>{getSectionTitle(section.title)}</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#7646FF']}
                tintColor={'#7646FF'}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

WeeklyTab.propTypes = {
  searchQuery: PropTypes.string
};

export default WeeklyTab;