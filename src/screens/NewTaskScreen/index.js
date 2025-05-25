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
import { createNewTask } from '../../redux/tasksSlice'

const NewTaskScreen = () => {
  
  const { control, handleSubmit, reset } = useForm();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateTimeString, setDateTimeString] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  // In the onAddPressed function, update with:

  const onAddPressed = (data) => {
    if (!dateTimeString) {
      Alert.alert('Error', 'Please select date and time');
      return;
    }

    const newTask = {
      taskName: data.taskname,
      description: data.description,
      type: data.category || 'General',
      date: dateTimeString,
      notification: data.notification || '',
      starred: false,
      status: 'Pending',
      priority: (selectedImageIndex + 1).toString(), // Convert to string for Firebase
      color: ['red', 'orange', 'blue', 'green'][selectedImageIndex] // Map index to color
    };

    dispatch({ type: 'CREATE_TASK_REQUEST', payload: newTask });
    
    // Reset form and show success message
    Alert.alert('Success', 'Task added successfully', [
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack();
          reset();
        },
      },
    ]);
  }

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

        <View style={styles.containerCustomInput}>
          <Controller
          control={control}
          render={({field: {onChange, value}}) => (
          <CustomInput 
            placeholder={"Notification"} 
            value={value} 
            onChangeText={onChange} 
            secureTextEntry={false} 
            customInputTextStyle={{marginLeft: -20}}
          />
          )}
          name="notification"
          defaultValue=""
          />
        </View>

        <CustomButton text="ADD" onPress={handleSubmit(onAddPressed)} customStyle={{backgroundColor: '#7646FF', marginTop: '67%', height: 60, justifyContent: 'center'}} customText={{fontWeight: 'bold', fontSize: 18}}/>
      </View>
    </View>

  )
}

export default NewTaskScreen