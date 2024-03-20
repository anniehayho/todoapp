import { View, Text, useWindowDimensions, useState } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'
import { TabView, SceneMap } from 'react-native-tab-view';
import DailyTab from '../DailyTab';
import WeeklyTab from '../WeeklyTab';
import MonthlyTab from '../MonthlyTab';
import TabViewNavigation from '../../components/TabViewNavigation';

const HomeScreen = () => {

  return (
    <View style={styles.containerHome}>
        <Header/>
    </View>
  )
};

export default HomeScreen;