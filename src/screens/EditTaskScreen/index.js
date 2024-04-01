import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, Alert} from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import backIcon from '../../assets/images/backIcon.png'
import bellIcon from '../../assets/images/bellIcon.png'
import searchIcon from '../../assets/images/searchIcon.png'
import CustomInput from '../../components/CustomInput'
import redIcon from '../../assets/images/redIcon.png'
import orangeIcon from '../../assets/images/orangeIcon.png'
import blueIcon from '../../assets/images/blueIcon.png'
import greenIcon from '../../assets/images/greenIcon.png'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const EditTaskScreen = () => {

  const [taskname, setTaskname] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [datetime, setDateTime] = useState('');
  const [notification, setNotification] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigation = useNavigation();

  const onAddPressed = () => 
  {
    Alert.alert('Added Task', '', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('NewTaskScreen');
          setTaskname('');
          setDescription('');
          setCategory('');
          setDateTime('');
          setNotification('');
          setSelectedImageIndex(0);
        },
      },
    ]);
  }

  const onBackPressed = () => 
  {
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
          <Text style={styles.titlteTextInput}>Task Name</Text>
          <CustomInput onChangeText={"Task Name"} value={taskname} setValue={setTaskname} secureTextEntry={false} customInputTextStyle={{marginLeft: -20}}/>
        </View>

        <View style={styles.containerCustomInput}>
          <Text style={styles.titlteTextInput}>Description</Text>
          <CustomInput placeholder={"Description"} value={description} setValue={setDescription} secureTextEntry={false} customInputTextStyle={{marginLeft: -20}}/>
        </View>
          
        <View style={styles.containerCustomInput}>
          <Text style={styles.titlteTextInput}>Category</Text>
          <CustomInput placeholder={"Category"} value={category} setValue={setCategory} secureTextEntry={false} customInputTextStyle={{marginLeft: -20}}/>
        </View>
            
        <View style={styles.containerCustomInput}>
          <Text style={styles.titlteTextInput}>Pick Date & Time</Text>
          <CustomInput placeholder={"Pick Date & Time"} value={datetime} setValue={setDateTime} secureTextEntry={false} customInputTextStyle={{marginLeft: -20}}/>
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
          <Text style={styles.titlteTextInput}>Notification</Text>
          <CustomInput placeholder={"Notification"} value={notification} setValue={setNotification} secureTextEntry={false} customInputTextStyle={{marginLeft: -20}}/>
        </View>

        <CustomButton text="ADD" onPress={onAddPressed} customStyle={{backgroundColor: '#7646FF', marginTop: '67%', height: 60, justifyContent: 'center'}} customText={{fontWeight: 'bold', fontSize: 18}}/>
      </View>
    </View>

  )
}

export default EditTaskScreen