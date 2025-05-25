import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// Safely import PushNotification
let PushNotification = null;
let isAvailable = false;

try {
  // Dynamic import to handle missing dependency gracefully
  const pushNotificationModule = require('react-native-push-notification'); // eslint-disable-line
  PushNotification = pushNotificationModule;
  isAvailable = true;
  console.log('Push notification library loaded successfully');
} catch (error) {
  console.warn('Push notification library not available, notifications will be disabled:', error.message);
  isAvailable = false;
}

class NotificationService {
  constructor() {
    this.lastId = 0;
    this.isConfigured = false;
    this.isAvailable = isAvailable;
    
    if (PushNotification && this.isAvailable) {
      this.configure();
    } else {
      console.log('NotificationService initialized without push notification support');
    }
  }

  configure = () => {
    if (!PushNotification || this.isConfigured) {
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
          console.error(err.message, err);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: true,
        requestPermissions: true,
      });

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

      this.isConfigured = true;
      console.log('NotificationService configured successfully');
    } catch (error) {
      console.error('Error configuring notifications:', error);
    }
  };

  scheduleTaskNotifications = async (task) => {
    if (!PushNotification || !this.isConfigured) {
      console.warn('Push notifications not available - notifications will be skipped');
      // Still return success so task creation doesn't fail
      return Promise.resolve();
    }

    try {
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
      if (!PushNotification) {
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
    if (!PushNotification) {
      return;
    }

    try {
      const storedIds = await AsyncStorage.getItem(`notifications_${taskId}`);
      if (storedIds) {
        const ids = JSON.parse(storedIds);
        ids.forEach(id => {
          try {
            PushNotification.cancelLocalNotifications({ id: id.toString() });
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
    if (!PushNotification) {
      return;
    }
    try {
      PushNotification.cancelAllLocalNotifications();
      console.log('All notifications cleared');
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  checkPermissions = () => {
    return new Promise((resolve) => {
      if (!PushNotification) {
        resolve({ alert: false, badge: false, sound: false });
        return;
      }
      try {
        PushNotification.checkPermissions((permissions) => {
          resolve(permissions);
        });
      } catch (error) {
        console.error('Error checking permissions:', error);
        resolve({ alert: false, badge: false, sound: false });
      }
    });
  };

  requestPermissions = () => {
    return new Promise((resolve) => {
      if (!PushNotification) {
        resolve({ alert: false, badge: false, sound: false });
        return;
      }
      try {
        PushNotification.requestPermissions().then((permissions) => {
          resolve(permissions);
        });
      } catch (error) {
        console.error('Error requesting permissions:', error);
        resolve({ alert: false, badge: false, sound: false });
      }
    });
  };
}

export default new NotificationService(); 