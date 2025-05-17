import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, Alert, Platform, Pressable } from 'react-native';
import styles from './styles';
import backIcon from '@assets/images/backIcon.png';
import bellIcon from '@assets/images/bellIcon.png';
import searchIcon from '@assets/images/searchIcon.png';
import CustomInput from '@components/CustomInput';
import redIcon from '@assets/images/redIcon.png';
import orangeIcon from '@assets/images/orangeIcon.png';
import blueIcon from '@assets/images/blueIcon.png';
import greenIcon from '@assets/images/greenIcon.png';
import CustomButton from '@components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params;
  const dispatch = useDispatch();
  const taskState = useSelector(state => state.task);
  const updatedTaskRef = useRef(null);

  // Get priority index (default to 0 if not found)
  const priorityToIndex = (priority) => {
    if (!priority) return 0;
    const index = parseInt(priority) - 1;
    return index >= 0 && index <= 3 ? index : 0;
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(priorityToIndex(task?.priority));
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(
    task?.dateTime?.toDate ? task.dateTime.toDate() : 
    task?.date && task?.time ? moment(`${task.date} ${task.time}`, 'DD-MM-YYYY HH:mm').toDate() : 
    new Date()
  );
  const [dateTimeString, setDateTimeString] = useState(
    task?.date && task?.time ? `${task.date} || ${task.time}` : ''
  );
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      taskname: task?.taskName || '',
      description: task?.description || '',
      category: task?.type || '',
      notification: task?.notification || '',
    },
  });

  // Add a function to check for network connectivity
  const checkNetworkConnectivity = async () => {
    try {
      // Add your network connectivity check here if you have a specific method
      // This is a simple example that would work in a web environment
      // For React Native, you would typically use NetInfo
      return true; // Assume connected for now
    } catch (error) {
      console.error('Network check error:', error);
      return false;
    }
  };

  const onEditPressed = async (data) => {
    if (!dateTimeString) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }

    const updatedTask = {
      id: task.id,
      taskName: data.taskname,
      description: data.description,
      type: data.category,
      date: dateTimeString.split('||')[0].trim(),
      time: dateTimeString.split('||')[1].trim(),
      priority: (selectedImageIndex + 1).toString(),
      color: ['red', 'orange', 'blue', 'green'][selectedImageIndex],
      status: task.status || 'Pending',
      starred: task.starred || false,
    };

    // Store the updated task in the ref for later use
    updatedTaskRef.current = updatedTask;
    
    dispatch({ 
      type: 'UPDATE_TASK_REQUEST', 
      payload: updatedTask,
      meta: { 
        successMessage: 'Task updated successfully',
        navigateTo: 'TaskDetailsScreen',
        taskData: updatedTask
      }
    });
    
    setLoading(true);
    setIsSubmitted(true);
  };

  // useEffect to handle navigation after successful update
  useEffect(() => {
    if (taskState.loading === false && !taskState.error && isSubmitted) {
      Alert.alert('Success', 'Task updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('TaskDetailsScreen', { task: updatedTaskRef.current });
          },
        },
      ]);
      setIsSubmitted(false);
    } else if (taskState.error && isSubmitted) {
      // Handle offline or other errors
      Alert.alert(
        'Connection Error', 
        'Unable to update task. Please check your network connection.',
        [
          {
            text: 'Try Again',
            onPress: () => {
              if (updatedTaskRef.current) {
                dispatch({ 
                  type: 'UPDATE_TASK_REQUEST', 
                  payload: updatedTaskRef.current,
                  meta: { 
                    successMessage: 'Task updated successfully',
                    navigateTo: 'TaskDetailsScreen',
                    taskData: updatedTaskRef.current
                  }
                });
              }
            }
          },
          {
            text: 'Cancel',
            onPress: () => setIsSubmitted(false),
            style: 'cancel'
          }
        ]
      );
    }
  }, [taskState.loading, taskState.error, isSubmitted]);

  const onBackPressed = () => {
    navigation.goBack();
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

  return (
    <View style={styles.containerNewTaskScreen}>
      <View style={styles.headerNewTaskScreen}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPressed}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.titleApp}>
            <Text>Edit Task</Text>
          </Text>
          <TouchableOpacity>
            <Image source={bellIcon} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>
        <View style={{padding: 20}}>
          <View style={styles.searchBar}>
            <TextInput style={{width: '90%'}}placeholder='Search Task'/>
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.contentNewTaskScreen}>
        <View style={styles.containerCustomInput}>
          <Text style={{color: 'gray', marginLeft: 20, paddingTop: 5 }}>Task Name</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={"Task Name"}
                secureTextEntry={false}
                customInputTextStyle={{ marginLeft: -20 }}
              />
            )}
            name="taskname"
            rules={{ required: true }}
          />
          {errors.taskname && <Text style={{color: 'red', marginLeft: 20}}>Task name is required</Text>}
        </View>

        <View style={{ backgroundColor: '#fff', alignSelf: 'flex-start', width: '100%', bottom: 0 }}>
          <View>
            <Text style={styles.titleTextInput}>Description</Text>
            <View style={styles.containerOfDescription}>
              <Controller
                control={control}
                render={({ field }) => (
                  <CustomInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder={"Description"}
                    multiline={true}
                    textAlignVertical="top"
                    customInputTextStyle={styles.textInput}
                  />
                )}
                name="description"
              />
            </View>
          </View>
        </View>

        <View style={styles.containerCustomInput}>
          <Text style={styles.titleTextInput}>Category</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={"Category"}
                secureTextEntry={false}
                customInputTextStyle={{ marginLeft: -20 }}
              />
            )}
            name="category"
          />
        </View>

        <View style={styles.containerCustomInput}>
          <Text style={styles.titleTextInput}>Pick Date & Time</Text>
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              placeholder={"Pick Date & Time"} 
              value={dateTimeString}
              onChangeText={setDateTimeString} 
              secureTextEntry={false} 
              style={{marginLeft: 20}}
              editable={false}
              onPressIn={toggleDatePicker}
            />
          </Pressable>
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

        <View style={styles.containerCustomInput}>
          <Text style={styles.titleTextInput}>Notification</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={"Notification"}
                secureTextEntry={false}
                customInputTextStyle={{ marginLeft: -20 }}
              />
            )}
            name="notification"
          />
        </View>
      </View>

      <View style={styles.editButtonContainer}>
        <CustomButton 
          text={loading ? "UPDATING..." : "UPDATE"} 
          onPress={handleSubmit(onEditPressed)} 
          customStyle={{ backgroundColor: '#7646FF', height: 60, justifyContent: 'center', bottom: 0 }} 
          customText={{ fontWeight: 'bold', fontSize: 18 }}
        />
      </View>
    </View>
  );
}

export default EditTaskScreen;