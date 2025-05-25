import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, Alert, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import backIcon from '@assets/images/backIcon.png'
import bellIcon from '@assets/images/bellIcon.png'
import searchIcon from '@assets/images/searchIcon.png'
import CustomInput from '@components/CustomInput'
import redIcon from '@assets/images/redIcon.png'
import orangeIcon from '@assets/images/orangeIcon.png'
import blueIcon from '@assets/images/blueIcon.png'
import greenIcon from '@assets/images/greenIcon.png'
import CustomButton from '@components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'
import NotificationService from '../../services/NotificationService'
import moment from 'moment'

const NewTaskScreen = () => {
  
  const { control, handleSubmit, reset } = useForm();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateTimeString, setDateTimeString] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState({
    notify5MinBefore: false,
    notify10MinBefore: false,
    notify15MinBefore: false,
  });

  const dispatch = useDispatch();

  const onAddPressed = async (data) => {
    if (!dateTimeString) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }

    const hasNotificationSelected = Object.values(selectedNotifications).some(value => value);

    const newTask = {
      taskName: data.taskname,
      description: data.description,
      type: data.category || 'General',
      date: dateTimeString,
      notification: hasNotificationSelected 
        ? Object.keys(selectedNotifications)
            .filter(key => selectedNotifications[key])
            .map(key => key.replace('notify', '').replace('MinBefore', ' min'))
            .join(', ')
        : 'No notifications',
      starred: false,
      status: 'Pending',
      priority: (selectedImageIndex + 1).toString(),
      color: ['red', 'orange', 'blue', 'green'][selectedImageIndex],
      notificationSettings: selectedNotifications
    };

    dispatch({ type: 'CREATE_TASK_REQUEST', payload: newTask });
    
    try {
      const taskDateTime = moment(date);
      if (taskDateTime.isAfter(moment()) && hasNotificationSelected) {
        const taskWithDateTime = {
          ...newTask,
          id: Date.now().toString(),
          dateTime: taskDateTime.toISOString()
        };
        
        await scheduleCustomNotifications(taskWithDateTime, selectedNotifications);
      }
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
    
    const successMessage = hasNotificationSelected 
      ? 'Task added successfully with notifications scheduled!'
      : 'Task added successfully!';
      
    Alert.alert('Success', successMessage, [
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack();
          reset();
          setSelectedNotifications({
            notify5MinBefore: false,
            notify10MinBefore: false,
            notify15MinBefore: false,
          });
        },
      },
    ]);
  }

  const scheduleCustomNotifications = async (task, notificationSettings) => {
    try {
      const taskDateTime = moment(task.dateTime);
      
      if (!taskDateTime.isValid()) {
        console.error('Invalid task date time');
        return;
      }

      const notificationIds = [];

      if (notificationSettings.notify5MinBefore) {
        const id = await NotificationService.scheduleNotification(
          taskDateTime.clone().subtract(5, 'minutes').toDate(),
          `Task reminder: ${task.taskName}`,
          `Your task "${task.taskName}" is starting in 5 minutes`,
          task.id + '_5min'
        );
        if (id) notificationIds.push(id);
      }

      if (notificationSettings.notify10MinBefore) {
        const id = await NotificationService.scheduleNotification(
          taskDateTime.clone().subtract(10, 'minutes').toDate(),
          `Task reminder: ${task.taskName}`,
          `Your task "${task.taskName}" is starting in 10 minutes`,
          task.id + '_10min'
        );
        if (id) notificationIds.push(id);
      }

      if (notificationSettings.notify15MinBefore) {
        const id = await NotificationService.scheduleNotification(
          taskDateTime.clone().subtract(15, 'minutes').toDate(),
          `Task reminder: ${task.taskName}`,
          `Your task "${task.taskName}" is starting in 15 minutes`,
          task.id + '_15min'
        );
        if (id) notificationIds.push(id);
      }

      console.log(`Scheduled ${notificationIds.length} custom notifications for task: ${task.taskName}`);
      
    } catch (error) {
      console.error('Error scheduling custom notifications:', error);
    }
  };

  const toggleNotificationOption = (option) => {
    setSelectedNotifications(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const onBackPressed = () => 
  {
      navigation.goBack('HomeScreen');
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDateTimeString(formatDate(currentDate)); 
  };

  const confirmIOSDate = () => {
    setDateTimeString(formatDate(date));
    toggleDatePicker();
  }

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}-${formattedMonth}-${year} || ${formattedHours}:${formattedMinutes}`;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.containerNewTaskScreen}>
      <View style={styles.headerNewTaskScreen}>
        
          <StatusBar barStyle={'light-content'} />

          <View style={styles.headerBar}>
            <TouchableOpacity onPress={onBackPressed}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>

            <Text style={styles.titleApp}>
              <Text>New Task</Text>
            </Text>

            <TouchableOpacity>
                <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>

          </View>

          <View style={{padding: 20}}>
            <View style={styles.searchBar}>
              <TextInput 
                style={{width: '90%'}} 
                placeholder='Search Task'
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <TouchableOpacity onPress={searchQuery ? clearSearch : undefined}>
                <Image source={searchIcon} style={styles.searchIcon}/>
              </TouchableOpacity>
            </View>
          </View>
      </View>

      <View style={styles.contentNewTaskScreen}>
        <View style={styles.containerCustomInput}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder={"Task Name"}
                value={value}
                onChangeText={onChange}
                secureTextEntry={false}
                customInputTextStyle={{ marginLeft: -20 }}
              />
            )}
            name="taskname"
            defaultValue=""
          />
        </View>

        <View style={styles.containerCustomInput}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
            <CustomInput 
              placeholder={"Description"} 
              value={value} 
              onChangeText={onChange} 
              secureTextEntry={false} 
              customInputTextStyle={{marginLeft: -20}}
            />
            )}
            name="description"
            defaultValue=""
          />
        </View>
            
        <View style={styles.containerCustomInput}>
          <Controller
          control={control}
          render={({field: {onChange, value}}) => (
          <CustomInput 
            placeholder={"Category"} 
            value={value} 
            onChangeText={onChange} 
            secureTextEntry={false} 
            customInputTextStyle={{marginLeft: -20}}
            /> 
          )}
          name="category"
          defaultValue=""
          />
        </View>

        <View style={styles.containerCustomInput}>
          {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                placeholder={"Pick Date & Time"} 
                value={dateTimeString}
                onChangeText={setDateTimeString} 
                secureTextEntry={false} 
                style={{marginLeft: 20}}
                editable={false}
                onPressIn={toggleDatePicker}
                maximumDate={new Date('2030-1-1')}
                minimumDate={new Date('2000-1-1')}
              />
            </Pressable>
            )}    
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: 'row',
            justifyContent: 'space-between', marginHorizontal: 50}}
          >
          <TouchableOpacity style={{ alignItems: 'center', height: 40, width: 100, backgroundColor: 'lightgray', justifyContent: 'center', borderRadius: 30 }}
          onPress={toggleDatePicker}>
            <Text style={{fontWeight: 'bold', color: '#7646FF'}}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', height: 40, width: 100, backgroundColor: '#7646FF', justifyContent: 'center', borderRadius: 30 }}
          onPress={confirmIOSDate}>
            <Text style={{fontWeight: 'bold', color: '#fff'}}>Confirm</Text>
          </TouchableOpacity>
          </View>
        )}

        <Text style={styles.priorityStyle}>Priority</Text>

        <View style={[styles.containerCustomInput, {flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}]}>

          <View style={[styles.containerIcons, {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}]}>
            {selectedImageIndex === 0 && (
              <Image
                source={redIcon}
                style={[styles.smallIcon, { position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}
              />
            )}
            <TouchableOpacity onPress={() => setSelectedImageIndex(0)}>
              <Image
                source={redIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
            
          </View> 

          <View style={[styles.containerIcons, {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}]}>
            {selectedImageIndex === 1 && (
              <Image
                source={orangeIcon}
                style={[styles.smallIcon, { position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}
              />
            )}
            <TouchableOpacity onPress={() => setSelectedImageIndex(1)}>
              <Image
                source={orangeIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.containerIcons, {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}]}>
            {selectedImageIndex === 2 && (
              <Image
                source={blueIcon}
                style={[styles.smallIcon, { position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}
              />
            )}
            <TouchableOpacity onPress={() => setSelectedImageIndex(2)}>
              <Image
                source={blueIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.containerIcons, {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}]}>
            {selectedImageIndex === 3 && (
              <Image
                source={greenIcon}
                style={[styles.smallIcon, { position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }]}
              />
            )}
            <TouchableOpacity onPress={() => setSelectedImageIndex(3)}>
              <Image
                source={greenIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.priorityStyle}>Notification</Text>

        <View style={[styles.containerCustomInput, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 15}]}>
          <TouchableOpacity 
            onPress={() => toggleNotificationOption('notify5MinBefore')}
            style={[
              styles.notificationOption,
              {
                backgroundColor: selectedNotifications.notify5MinBefore ? '#7646FF' : '#f0f0f0',
                borderColor: selectedNotifications.notify5MinBefore ? '#7646FF' : '#e0e0e0',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginHorizontal: 5,
              }
            ]}
          >
            <Text style={{
              color: selectedNotifications.notify5MinBefore ? '#fff' : '#666',
              fontWeight: selectedNotifications.notify5MinBefore ? 'bold' : 'normal',
              fontSize: 14
            }}>
              5&apos;
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleNotificationOption('notify10MinBefore')}
            style={[
              styles.notificationOption,
              {
                backgroundColor: selectedNotifications.notify10MinBefore ? '#7646FF' : '#f0f0f0',
                borderColor: selectedNotifications.notify10MinBefore ? '#7646FF' : '#e0e0e0',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginHorizontal: 5,
              }
            ]}
          >
            <Text style={{
              color: selectedNotifications.notify10MinBefore ? '#fff' : '#666',
              fontWeight: selectedNotifications.notify10MinBefore ? 'bold' : 'normal',
              fontSize: 14
            }}>
              10&apos;
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleNotificationOption('notify15MinBefore')}
            style={[
              styles.notificationOption,
              {
                backgroundColor: selectedNotifications.notify15MinBefore ? '#7646FF' : '#f0f0f0',
                borderColor: selectedNotifications.notify15MinBefore ? '#7646FF' : '#e0e0e0',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginHorizontal: 5,
              }
            ]}
          >
            <Text style={{
              color: selectedNotifications.notify15MinBefore ? '#fff' : '#666',
              fontWeight: selectedNotifications.notify15MinBefore ? 'bold' : 'normal',
              fontSize: 14
            }}>
              15&apos;
            </Text>
          </TouchableOpacity>
        </View>

        {Object.values(selectedNotifications).some(value => value) && (
          <View style={{marginTop: 10, paddingHorizontal: 20}}>
            <Text style={{color: '#7646FF', fontSize: 12, textAlign: 'center', fontWeight: 'bold'}}>
              Notifications selected: {Object.keys(selectedNotifications)
                .filter(key => selectedNotifications[key])
                .map(key => key.replace('notify', '').replace('MinBefore', ' min'))
                .join(', ')} before task time
            </Text>
            {dateTimeString && (
              <View style={{marginTop: 5}}>
                <Text style={{color: '#666', fontSize: 11, textAlign: 'center'}}>
                  Task time: {dateTimeString}
                </Text>
                {Object.keys(selectedNotifications)
                  .filter(key => selectedNotifications[key])
                  .map(key => {
                    const minutes = key.replace('notify', '').replace('MinBefore', '');
                    const taskTime = moment(date);
                    const notificationTime = taskTime.clone().subtract(parseInt(minutes), 'minutes');
                    return (
                      <Text key={key} style={{color: '#7646FF', fontSize: 10, textAlign: 'center'}}>
                        {minutes} min reminder: {notificationTime.format('DD-MM-YYYY || HH:mm')}
                      </Text>
                    );
                  })}
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton 
          text="ADD" 
          onPress={handleSubmit(onAddPressed)} 
          customStyle={{backgroundColor: '#7646FF', height: 60, justifyContent: 'center'}} 
          customText={{fontWeight: 'bold', fontSize: 18}}
        />
      </View>
    </View>
  )
}

export default NewTaskScreen