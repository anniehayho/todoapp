import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// Safely import PushNotification
let PushNotification = null;
let isAvailable = false;

try {
  // Dynamic import to handle missing dependency gracefully
  const pushNotificationModule = require('react-native-push-notification'); // eslint-disable-line
  
  // Validate that the module is properly loaded and has required methods
  if (pushNotificationModule && typeof pushNotificationModule === 'object') {
    PushNotification = pushNotificationModule;
    isAvailable = true;
    console.log('Push notification library loaded successfully');
  } else {
    console.warn('Push notification module loaded but appears to be invalid');
    isAvailable = false;
  }
} catch (error) {
  console.warn('Push notification library not available, notifications will be disabled:', error.message);
  isAvailable = false;
}

class NotificationService {
  constructor() {
    this.lastId = 0;
    this.isConfigured = false;
    this.isAvailable = isAvailable;
    
    // Don't automatically configure in constructor to avoid early errors
    console.log('NotificationService initialized');
  }

  configure = () => {
    if (!PushNotification || this.isConfigured || !this.isAvailable) {
      return;
    }

    try {
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:', token);
        },

        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
        },

        onAction: function (notification) {
          console.log('ACTION:', notification.action);
          console.log('NOTIFICATION:', notification);
        },

        onRegistrationError: function(err) {
          console.error('Registration Error:', err.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: false, // Set to false to avoid getInitialNotification error
        requestPermissions: false, // Don't request permissions immediately
      });

      // Only create channel if on Android and PushNotification has createChannel method
      if (PushNotification && typeof PushNotification.createChannel === 'function') {
        PushNotification.createChannel(
          {
            channelId: 'task-reminders',
            channelName: 'Task Reminders',
            channelDescription: 'Notifications for task reminders',
            playSound: true,
            soundName: 'default',
            importance: 4,
            vibrate: true,
          },
          (created) => console.log(`createChannel returned '${created}'`)
        );
      } else {
        console.log('createChannel not available, skipping channel creation');
      }

      this.isConfigured = true;
      console.log('NotificationService configured successfully');
    } catch (error) {
      console.error('Error configuring notifications:', error);
      this.isAvailable = false;
    }
  };

  scheduleTaskNotifications = async (task) => {
    if (!PushNotification || !this.isConfigured || !this.isAvailable) {
      console.warn('Push notifications not available - notifications will be skipped');
      // Still return success so task creation doesn't fail
      return Promise.resolve();
    }

    try {
      // Request permissions before scheduling if not already done
      await this.ensurePermissions();
      
      const settings = await this.getNotificationSettings();
      const taskDateTime = moment(task.dateTime);
      
      if (!taskDateTime.isValid()) {
        console.error('Invalid task date time');
        return;
      }

      // Clear existing notifications for this task
      await this.clearTaskNotifications(task.id);
      
      const notificationIds = [];

      // Schedule notifications based on settings
      if (settings.notify5MinBefore) {
        const id = await this.scheduleNotification(
          taskDateTime.clone().subtract(5, 'minutes').toDate(),
          `Task reminder: ${task.taskName}`,
          `Your task "${task.taskName}" is starting in 5 minutes`,
          task.id + '_5min'
        );
        if (id) notificationIds.push(id);
      }

      if (settings.notify10MinBefore) {
        const id = await this.scheduleNotification(
          taskDateTime.clone().subtract(10, 'minutes').toDate(),
          `Task reminder: ${task.taskName}`,
          `Your task "${task.taskName}" is starting in 10 minutes`,
          task.id + '_10min'
        );
        if (id) notificationIds.push(id);
      }

      if (settings.notify15MinBefore) {
        const id = await this.scheduleNotification(
          taskDateTime.clone().subtract(15, 'minutes').toDate(),
          `Task reminder: ${task.taskName}`,
          `Your task "${task.taskName}" is starting in 15 minutes`,
          task.id + '_15min'
        );
        if (id) notificationIds.push(id);
      }

      if (settings.notifyOnTime) {
        const id = await this.scheduleNotification(
          taskDateTime.toDate(),
          `Task time: ${task.taskName}`,
          `It's time for your task: "${task.taskName}"`,
          task.id + '_ontime'
        );
        if (id) notificationIds.push(id);
      }

      // Store notification IDs for this task
      await this.storeTaskNotificationIds(task.id, notificationIds);
      
      console.log(`Scheduled ${notificationIds.length} notifications for task: ${task.taskName}`);
      
    } catch (error) {
      console.error('Error scheduling task notifications:', error);
      // Don't throw error to prevent task creation from failing
    }
  };

  scheduleNotification = (date, title, message, userInfo) => {
    return new Promise((resolve) => {
      if (!PushNotification || !this.isAvailable || !this.isConfigured) {
        console.warn('Push notifications not available');
        resolve(null);
        return;
      }

      // Don't schedule notifications in the past
      if (moment(date).isBefore(moment())) {
        console.log('Notification time is in the past, skipping');
        resolve(null);
        return;
      }

      try {
        const id = this.lastId++;
        
        // Check if localNotificationSchedule method exists
        if (typeof PushNotification.localNotificationSchedule !== 'function') {
          console.warn('localNotificationSchedule method not available');
          resolve(null);
          return;
        }
        
        PushNotification.localNotificationSchedule({
          id: id.toString(),
          title: title,
          message: message,
          date: date,
          channelId: 'task-reminders',
          soundName: 'default',
          vibrate: true,
          vibration: 300,
          priority: 'high',
          importance: 'high',
          userInfo: { taskId: userInfo },
          actions: ['View Task', 'Mark Done'],
        });

        console.log(`Scheduled notification: ${title} at ${moment(date).format('YYYY-MM-DD HH:mm')}`);
        resolve(id);
      } catch (error) {
        console.error('Error scheduling notification:', error);
        resolve(null);
      }
    });
  };

  clearTaskNotifications = async (taskId) => {
    if (!PushNotification || !this.isAvailable) {
      return;
    }

    try {
      const storedIds = await AsyncStorage.getItem(`notifications_${taskId}`);
      if (storedIds) {
        const ids = JSON.parse(storedIds);
        ids.forEach(id => {
          try {
            if (typeof PushNotification.cancelLocalNotifications === 'function') {
              PushNotification.cancelLocalNotifications({ id: id.toString() });
            }
          } catch (error) {
            console.error('Error canceling notification:', error);
          }
        });
        await AsyncStorage.removeItem(`notifications_${taskId}`);
        console.log(`Cleared ${ids.length} notifications for task ${taskId}`);
      }
    } catch (error) {
      console.error('Error clearing task notifications:', error);
    }
  };

  storeTaskNotificationIds = async (taskId, notificationIds) => {
    try {
      await AsyncStorage.setItem(`notifications_${taskId}`, JSON.stringify(notificationIds));
    } catch (error) {
      console.error('Error storing notification IDs:', error);
    }
  };

  getNotificationSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('notificationSettings');
      if (settings) {
        return JSON.parse(settings);
      }
      
      // Default settings
      return {
        notify5MinBefore: true,
        notify10MinBefore: true,
        notify15MinBefore: true,
        notifyOnTime: true,
        enabled: true,
      };
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return {
        notify5MinBefore: true,
        notify10MinBefore: true,
        notify15MinBefore: true,
        notifyOnTime: true,
        enabled: true,
      };
    }
  };

  updateNotificationSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
      console.log('Notification settings updated:', newSettings);
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  clearAllNotifications = () => {
    if (!PushNotification || !this.isAvailable) {
      return;
    }
    try {
      if (typeof PushNotification.cancelAllLocalNotifications === 'function') {
        PushNotification.cancelAllLocalNotifications();
        console.log('All notifications cleared');
      }
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  checkPermissions = () => {
    return new Promise((resolve) => {
      if (!PushNotification || !this.isAvailable) {
        resolve({ alert: false, badge: false, sound: false });
        return;
      }
      try {
        if (typeof PushNotification.checkPermissions === 'function') {
          PushNotification.checkPermissions((permissions) => {
            resolve(permissions);
          });
        } else {
          resolve({ alert: false, badge: false, sound: false });
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        resolve({ alert: false, badge: false, sound: false });
      }
    });
  };

  requestPermissions = () => {
    return new Promise((resolve) => {
      if (!PushNotification || !this.isAvailable) {
        resolve({ alert: false, badge: false, sound: false });
        return;
      }
      try {
        if (typeof PushNotification.requestPermissions === 'function') {
          const permissionResult = PushNotification.requestPermissions();
          
          // Check if it returns a Promise
          if (permissionResult && typeof permissionResult.then === 'function') {
            permissionResult.then((permissions) => {
              resolve(permissions);
            }).catch((error) => {
              console.error('Error requesting permissions:', error);
              resolve({ alert: false, badge: false, sound: false });
            });
          } else {
            // If it doesn't return a Promise, treat the result as the permissions
            console.log('requestPermissions did not return a Promise, using result directly');
            resolve(permissionResult || { alert: false, badge: false, sound: false });
          }
        } else {
          console.log('requestPermissions method not available, skipping');
          resolve({ alert: false, badge: false, sound: false });
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
        resolve({ alert: false, badge: false, sound: false });
      }
    });
  };

  ensurePermissions = async () => {
    try {
      const permissions = await this.checkPermissions();
      if (!permissions.alert || !permissions.badge || !permissions.sound) {
        console.log('Requesting notification permissions...');
        const newPermissions = await this.requestPermissions();
        console.log('Permission request result:', newPermissions);
        return newPermissions;
      }
      return permissions;
    } catch (error) {
      console.warn('Error ensuring permissions:', error);
      return { alert: false, badge: false, sound: false };
    }
  };
}

export default new NotificationService(); 