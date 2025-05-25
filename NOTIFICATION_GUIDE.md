# Todo App Notification System

## Overview
The Todo App now includes a comprehensive notification system that allows users to receive reminders for their tasks at customizable intervals.

## Features

### Notification Timing Options
- **5 minutes before**: Get notified 5 minutes before your task starts
- **10 minutes before**: Get notified 10 minutes before your task starts  
- **15 minutes before**: Get notified 15 minutes before your task starts
- **When it's time**: Get notified exactly when your task begins

### Key Components

#### 1. NotificationService (`src/services/NotificationService.js`)
- Handles all notification scheduling and management
- Uses `react-native-push-notification` for local notifications
- Stores notification settings in AsyncStorage
- Manages notification permissions

#### 2. NotificationSettingsScreen (`src/screens/NotificationSettingsScreen/`)
- User interface for configuring notification preferences
- Toggle switches for each notification timing option
- Permission status display and request functionality
- Test notification feature

#### 3. Integration with Task Management
- **Task Creation**: Notifications are automatically scheduled when creating new tasks
- **Task Editing**: Notifications are rescheduled when editing existing tasks
- **Task Deletion**: Notifications are cleared when tasks are deleted

## How It Works

### 1. Setting Up Notifications
1. Navigate to Settings → Notifications
2. Grant notification permissions when prompted
3. Configure your preferred reminder timings
4. Test notifications to ensure they work

### 2. Creating Tasks with Notifications
1. Create a new task with a specific date and time
2. Notifications are automatically scheduled based on your settings
3. You'll receive reminders according to your preferences

### 3. Managing Existing Tasks
- **Editing**: When you edit a task's time, notifications are automatically rescheduled
- **Deleting**: When you delete a task, all associated notifications are cleared
- **Completing**: Completed tasks retain their notifications until the scheduled time

## Technical Implementation

### Dependencies
- `react-native-push-notification`: For local notifications
- `@react-native-async-storage/async-storage`: For storing settings
- `moment`: For date/time manipulation

### Android Configuration
The app includes necessary Android permissions in `AndroidManifest.xml`:
- `VIBRATE`: For notification vibration
- `RECEIVE_BOOT_COMPLETED`: For notifications after device restart
- `WAKE_LOCK`: For reliable notification delivery

### iOS Configuration
iOS notifications work out of the box with the react-native-push-notification library.

## Usage Examples

### Example 1: Morning Meeting Reminder
- Task: "Team Meeting"
- Time: 9:00 AM
- Notifications: 
  - 8:45 AM (15 minutes before)
  - 8:50 AM (10 minutes before)
  - 8:55 AM (5 minutes before)
  - 9:00 AM (when it's time)

### Example 2: Workout Session
- Task: "Gym Workout"
- Time: 6:00 PM
- Notifications:
  - 5:50 PM (10 minutes before)
  - 6:00 PM (when it's time)

## Troubleshooting

### Notifications Not Appearing
1. Check notification permissions in device settings
2. Ensure the app has permission to send notifications
3. Verify notification settings in the app
4. Test with the "Send Test Notification" feature

### Notifications Appearing Late
- This can happen if the device is in power-saving mode
- Ensure the app is not being killed by the system
- Check device-specific battery optimization settings

## Future Enhancements
- Custom notification sounds
- Snooze functionality
- Location-based reminders
- Integration with calendar apps
- Smart notification timing based on task priority 