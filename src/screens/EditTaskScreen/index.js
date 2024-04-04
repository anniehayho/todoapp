import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, Alert } from 'react-native';
import styles from './styles';
import backIcon from '../../assets/images/backIcon.png';
import bellIcon from '../../assets/images/bellIcon.png';
import searchIcon from '../../assets/images/searchIcon.png';
import CustomInput from '../../components/CustomInput';
import redIcon from '../../assets/images/redIcon.png';
import orangeIcon from '../../assets/images/orangeIcon.png';
import blueIcon from '../../assets/images/blueIcon.png';
import greenIcon from '../../assets/images/greenIcon.png';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

const EditTaskScreen = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params;

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      taskname: task?.taskName || '',
      description: task?.description || '',
      category: task?.type || '',
      datetime: task?.time || '',
      notification: task?.notification || '',
    },
  });

  const onEditPressed = (data) => {
    console.log(data);
    Alert.alert('Edited Task', '', [
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack('TaskDetailsScreen');
        },
      },
    ]);
  }

  const onBackPressed = () => {
    navigation.goBack('HomeScreen');
  }

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
            defaultValue={task?.taskName || ''}
          />
          {errors.taskname && <Text style={{color: 'red'}}>Task name is required</Text>}
        </View>

        <View style={{ backgroundColor: '#fff', alignSelf: 'flex-start', width: '100%', bottom: 0 }}>
          <View style={{}}>
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
                defaultValue={task?.description || ''}
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
            defaultValue={task?.type || ''}
          />
        </View>

        <View style={styles.containerCustomInput}>
          <Text style={styles.titleTextInput}>Pick Date & Time</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={"Pick Date & Time"}
                secureTextEntry={false}
                customInputTextStyle={{ marginLeft: -20 }}
              />
            )}
            name="datetime"
            defaultValue={task?.time || ''}
          />
        </View>

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
            defaultValue={task?.notification || ''}
          />
        </View>

      </View>

      <View style={styles.editButtonContainer}>
        <CustomButton text="EDIT" onPress={handleSubmit(onEditPressed)} customStyle={{ backgroundColor: '#7646FF', height: 60, justifyContent: 'center', bottom: 0 }} customText={{ fontWeight: 'bold', fontSize: 18 }}/>
      </View>
    </View>
  );
}

export default EditTaskScreen;
