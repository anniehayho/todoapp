import { View, Text, TouchableWithoutFeedback, SectionList, ImageBackground, RefreshControl} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import markIcon from '@assets/images/markIcon.png';
import TaskList from '@components/TaskList';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const WeeklyTab = ({ searchQuery }) => {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const swiper = useRef();
  const currentMonthYear = moment().format('MMMM, YYYY');
  const navigation = useNavigation();
  const weeklyTasksData = useSelector((state) => state.task.weeklyTasks);
  const dispatch = useDispatch();
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

  const getSectionTitle = (item) => {
    return moment(item.title, 'YYYY-MM-DD').isSame(moment(), 'day') ? 'Today' : moment(item.title, 'YYYY-MM-DD').format('D MMMM');
  };

  useEffect(() => {
    console.log('weeklyTasksData hihi', weeklyTasksData);
  }, [weeklyTasksData]);

  const [week, setWeek] = React.useState(1);
  
  const weeks = React.useMemo(() => {
    const start = moment().add(week - 1, 'week').startOf('week');

    return [-1, 0, 1, 2].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd').toUpperCase(), 
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const handleDatePress = (date) => {
    setValue(date); 
    setSelectedDate(date); 
  };

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
    <View style={styles.containerWeekly}>
      <Text style={styles.headerSchedule}>{currentMonthYear}</Text>
      <View style={styles.containterDatePicker}>
        <Swiper index={1} ref={swiper} showsPagination={false}
          loop={false}
          onIndexChanged={ind => {
            if(ind === 1) {
              return;
            }

            setTimeout(() => {
              const newIndex = ind -1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, 'week').toDate());
              swiper.current.scrollTo(1, false);
            }, 100);
          }}>

          {weeks.map((dates, index) => (
            <View key={index} style={styles.arrayDatePicker} >
              {dates.map((item, dateIndex) => {

                const isActive = value.toDateString() === item.date.toDateString();
                const isDateSelected = selectedDate && selectedDate.toDateString() === item.date.toDateString(); 

                return (
                  <TouchableWithoutFeedback key={dateIndex} onPress={() => handleDatePress(item.date)}>
                    <View style={[styles.containerEachDate]}>
                      <Text style={[styles.date, isActive && { color: '#111' }]}>
                        {item.weekday}
                      </Text>
                      <Text style={[styles.date, isActive && { fontWeight: 'bold', justifyContent: 'center', color: '#111' }]}>{item.date.getDate()}</Text>
                      {isDateSelected && <ImageBackground source={markIcon} style={styles.markIcon} />}
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.containerSectionList}>
      {filteredWeeklyTasks && filteredWeeklyTasks.data && Array.isArray(filteredWeeklyTasks.data) && filteredWeeklyTasks.data.length > 0 && (
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={filteredWeeklyTasks.data}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section: title }) => ( 
            <View>
              <Text style={styles.titleSectionList}>{getSectionTitle(title)}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TaskList item={item} onPressItem={handlePressItem} />
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
  )
}

WeeklyTab.propTypes = {
  searchQuery: PropTypes.string
};

export default WeeklyTab;