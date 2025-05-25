import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import backIcon from '@assets/images/backIcon.png';
import bellIcon from '@assets/images/bellIcon.png';
import NotificationService from '../../services/NotificationService';
import { useNavigation } from '@react-navigation/native';

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    enabled: true,
    notify5MinBefore: true,
    notify10MinBefore: true,
    notify15MinBefore: true,
    notifyOnTime: true,
  });
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    loadSettings();
    checkNotificationPermissions();
  }, []);

  const loadSettings = async () => {
    try {
      const currentSettings = await NotificationService.getNotificationSettings();
      setSettings(currentSettings);
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const checkNotificationPermissions = async () => {
    try {
      const currentPermissions = await NotificationService.checkPermissions();
      setPermissions(currentPermissions);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestNotificationPermissions = async () => {
    try {
      const granted = await NotificationService.requestPermissions();
      setPermissions(granted);
      if (granted.alert) {
        Alert.alert('Success', 'Notification permissions granted');
      } else {
        Alert.alert('Warning', 'Notification permissions not granted. Please enable them in device settings.');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'Failed to request notification permissions');
    }
  };

  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await NotificationService.updateNotificationSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      Alert.alert('Error', 'Failed to update notification settings');
    }
  };

  const SettingRow = ({ title, subtitle, value, onValueChange, disabled = false }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#e1e1e1', true: '#7646FF' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  SettingRow.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Permission Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={bellIcon} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Permissions</Text>
          </View>
          
          <View style={styles.permissionStatus}>
            <Text style={styles.permissionText}>
              Status: {permissions.alert ? 'Granted' : 'Not Granted'}
            </Text>
            {!permissions.alert && (
              <TouchableOpacity 
                style={styles.requestButton}
                onPress={requestNotificationPermissions}
              >
                <Text style={styles.requestButtonText}>Request Permissions</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Main Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <SettingRow
            title="Enable Notifications"
            subtitle="Turn on/off all task notifications"
            value={settings.enabled}
            onValueChange={(value) => updateSetting('enabled', value)}
          />
        </View>

        {/* Reminder Timing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminder Timing</Text>
          
          <SettingRow
            title="15 minutes before"
            subtitle="Get notified 15 minutes before your task"
            value={settings.notify15MinBefore}
            onValueChange={(value) => updateSetting('notify15MinBefore', value)}
            disabled={!settings.enabled}
          />
          
          <SettingRow
            title="10 minutes before"
            subtitle="Get notified 10 minutes before your task"
            value={settings.notify10MinBefore}
            onValueChange={(value) => updateSetting('notify10MinBefore', value)}
            disabled={!settings.enabled}
          />
          
          <SettingRow
            title="5 minutes before"
            subtitle="Get notified 5 minutes before your task"
            value={settings.notify5MinBefore}
            onValueChange={(value) => updateSetting('notify5MinBefore', value)}
            disabled={!settings.enabled}
          />
          
          <SettingRow
            title="When it's time"
            subtitle="Get notified exactly when your task begins"
            value={settings.notifyOnTime}
            onValueChange={(value) => updateSetting('notifyOnTime', value)}
            disabled={!settings.enabled}
          />
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>💡 How it works</Text>
            <Text style={styles.infoText}>
              When you create a task with a specific time, notifications will be scheduled according to your preferences above. You can enable multiple reminder times for each task.
            </Text>
          </View>
        </View>

        {/* Test Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => {
              NotificationService.scheduleNotification(
                new Date(Date.now() + 5000), // 5 seconds from now
                'Test Notification',
                'This is a test notification to verify your settings work correctly',
                'test'
              );
              Alert.alert('Test Scheduled', 'A test notification will appear in 5 seconds');
            }}
          >
            <Text style={styles.testButtonText}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationSettingsScreen; 