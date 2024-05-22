import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import WeeklyTab from '@screens/WeeklyTab/index.js';
import MonthlyTab from'@screens/MonthlyTab/index.js';
import DailyTab from '@screens/DailyTab/index.js';

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
      <View style={styles.containerRenderContent}>
      {renderContent()}
      </View>
    </View>
  );
};

export default TabViewNavigation;

