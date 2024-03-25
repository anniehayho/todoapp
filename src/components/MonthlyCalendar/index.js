import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from './styles';

const MonthlyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [currentDate, setCurrentDate] = useState(moment());

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const generateDays = () => {
    const days = [];
    const startDate = moment(currentDate).startOf('month').startOf('week');
    const endDate = moment(currentDate).endOf('month').endOf('week');
  
    let currentDay = startDate.clone();
  
    while (currentDay.isBefore(endDate)) {
      days.push(currentDay.clone());
      currentDay.add(1, 'day');
    }
  
    return days;
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(prevDate => prevDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => prevDate.clone().add(1, 'month'));
  };

  const renderDaysOfWeek = () => {
    return (
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayOfWeek}>{day}</Text>
        ))}
      </View>
    );
  };
  
  const renderDays = () => {
    const days = generateDays();
    const daysToRender = [];
  
    for (let i = 0; i < 5; i++) {
      const week = days.slice(i * 7, (i + 1) * 7).map((day, index) => {
        const isCurrentMonth = day.month() === currentDate.month();
        const isCurrentDay = day.isSame(moment(), 'day');
        const isCurrentDate = selectedDate.isSame(day, 'day');
        return (
        <TouchableOpacity
          key={day}
          style={[
            styles.day,
            
          ]}
          onPress={() => {
            if (day.month() !== currentDate.month()) {
              setCurrentDate(day);
              setSelectedDate(day);
            } else {
              setSelectedDate(day);
            }
          }}>
          <Text style={[styles.dayNumber, { color: isCurrentDay ? '#7646FF' : isCurrentMonth ? 'black' : 'lightgray'}, {fontWeight: isCurrentDay ? 'bold' : 'normal'}]}>{day.date()}</Text>
        </TouchableOpacity>
      )});
  
      daysToRender.push(
        <View key={`week-${i}`} style={styles.week}>
          {week}
        </View>
      );
    }
  
    return (
      <View style={styles.daysContainer}>
        {daysToRender}
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View style={styles.title}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.icon}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>{currentDate.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.icon}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.calendar}>
      {renderTitle()}
      {renderDaysOfWeek()}
      {renderDays()}
    </View>
  );
};

export default MonthlyCalendar;
