import { View, Text, TouchableWithoutFeedback, SectionList, ImageBackground} from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import markIcon from '../../assets/images/markIcon.png';
import TaskList from '../../components/TaskList';
import taskData from '../../components/TaskData/taskData';

const WeeklyTab = () => {

  const [value, setValue] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const swiper = React.useRef();

  const currentMonthYear = moment().format('MMMM, YYYY');

  useEffect(() => {
    setSelectedDate(value);
  }, []);

  const getSectionTitle = (date) => {
    if (moment(date).isSame(moment(), 'day')) {
      return 'Today';
    } else {
      return moment(date).format('DD MMMM');
    }
  };

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
  )
}

export default WeeklyTab;
