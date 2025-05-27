import React, { useState, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import styles from './styles';
import markIcon from '@assets/images/markIcon.png';

const WeeklyCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const swiper = useRef();
  const currentMonthYear = moment().format('MMMM, YYYY');
  const [week, setWeek] = useState(1);

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
    <View>
      <Text style={styles.headerSchedule}>{currentMonthYear}</Text>
      <View style={styles.containerDatePicker}>
        <Swiper
          index={1}
          ref={swiper}
          showsPagination={false}
          loop={false}
          onIndexChanged={ind => {
            if (ind === 1) {
              return;
            }

            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, 'week').toDate());
              swiper.current.scrollTo(1, false);
            }, 100);
          }}
        >
          {weeks.map((dates, index) => (
            <View key={index} style={styles.arrayDatePicker}>
              {dates.map((item, dateIndex) => {
                const isActive = value.toDateString() === item.date.toDateString();
                const isDateSelected = selectedDate && selectedDate.toDateString() === item.date.toDateString();

                return (
                  <TouchableWithoutFeedback key={dateIndex} onPress={() => handleDatePress(item.date)}>
                    <View style={[
                      styles.containerEachDate,
                      isActive && styles.activeDateContainer
                    ]}>
                      <Text style={[styles.weekday, isActive && styles.activeDate]}>
                        {item.weekday}
                      </Text>
                      <Text style={[styles.dateNumber, isActive && styles.activeDate]}>
                        {item.date.getDate()}
                      </Text>
                      {isDateSelected && <ImageBackground source={markIcon} style={styles.markIcon} resizeMode="contain" />}
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default WeeklyCalendar; 