import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles';
import bellIcon from '@assets/images/bellIcon.png';
import categoryIcon from '@assets/images/categoryIcon.png';
import backIcon from '@assets/images/backIcon.png';
import reminderIcon from '@assets/images/bellIcon.png';
import themeIcon from '@assets/images/settingIcon.png'; // Placeholder, replace with palette icon if available
import calendarIcon from '@assets/images/settingIcon.png'; // Placeholder, replace with calendar icon if available
import paletteIcon from '@assets/images/settingIcon.png'; // Placeholder, replace with palette icon if available
import questionIcon from '@assets/images/settingIcon.png'; // Placeholder, replace with question icon if available
import CustomBox from '@components/CustomBox';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomBox text="Notifications" leftIcon={bellIcon} onPress={() => {}} />
        <View style={styles.rowWithValue}>
          <View style={styles.rowLeft}>
            <Image source={themeIcon} style={styles.icon} />
            <Text style={styles.text}>Theme</Text>
          </View>
          <Text style={styles.valueText}>Light</Text>
        </View>
        <View style={styles.rowWithValue}>
          <View style={styles.rowLeft}>
            <Image source={calendarIcon} style={styles.icon} />
            <Text style={styles.text}>Default View</Text>
          </View>
          <Text style={styles.valueText}>Daily</Text>
        </View>
        <CustomBox text="Task Priority Colors" leftIcon={paletteIcon} onPress={() => {}} />
        <View style={styles.rowWithValue}>
          <View style={styles.rowLeft}>
            <Image source={reminderIcon} style={styles.icon} />
            <Text style={styles.text}>Reminder Time</Text>
          </View>
          <Text style={styles.valueText}>10 min before</Text>
        </View>
        <CustomBox text="Categories" leftIcon={categoryIcon} onPress={() => {}} />
        <CustomBox text="Privacy" leftIcon={questionIcon} onPress={() => {}} />
        <CustomBox text="Help & Support" leftIcon={questionIcon} onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
