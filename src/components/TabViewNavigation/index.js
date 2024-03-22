import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Image, StyleSheet } from 'react-native';
import styles from './styles';
import DailyTab from '../../screens/DailyTab/index.js';
import WeeklyTab from '../../screens/WeeklyTab/index.js';
import MonthlyTab from '../../screens/MonthlyTab/index.js';

const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'];

const TabViewNavigation = () => {
  const [selected, setSelected] = useState(0);

  const renderContent = () => {
    switch (selected) {
      case 0:
        return <DailyTab />;
      case 1:
        return <WeeklyTab />;
      case 2:
        return <MonthlyTab />;
      default:
        return null;
    }
  };

  const DailyContent = () => {
    return DailyTab
  };

  const WeeklyContent = () => {
    return WeeklyTab
  };

  const MonthlyContent = () => {
    return MonthlyTab
  };

  return (
    <View style={styles.containerTabView}>
      <View style={styles.containerSubTabView}>
        {tabs.map((e, i) => (
          <Pressable key={i} 
            onPress={() => setSelected(i)}
            style={styles.tabItem}>
            <Text style={[styles.titleTabView, selected === i && {fontWeight: 'bold'}]}>{e}</Text> 
            {selected === i && <View style={styles.lineTabView} />}
          </Pressable>  
        ))}
      </View>

      {renderContent()}
    </View>
  );
};

export default TabViewNavigation;

