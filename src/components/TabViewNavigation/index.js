import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import WeeklyTab from '@screens/WeeklyTab/index.js';
import MonthlyTab from'@screens/MonthlyTab/index.js';
import DailyTab from '@screens/DailyTab/index.js';

const tabs = ['DAILY', 'WEEKLY', 'MONTHLY'];

const TabViewNavigation = ({ searchQuery }) => {
  const [selected, setSelected] = useState(0);
  const renderContent = () => {
    switch (selected) {
      case 0:
        return <DailyTab searchQuery={searchQuery} />;
      case 1:
        return <WeeklyTab searchQuery={searchQuery} />;
      case 2:
        return <MonthlyTab searchQuery={searchQuery} />;
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

TabViewNavigation.propTypes = {
  searchQuery: PropTypes.string
};

export default TabViewNavigation;

