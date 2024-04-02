/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, FlatList } from 'react-native'
import React from 'react'
import styles from './styles'
import backIcon from '../../assets/images/backIcon.png'
import bellIcon from '../../assets/images/bellIcon.png'
import searchIcon from '../../assets/images/searchIcon.png'
import plusIcon from '../../assets/images/plusIcon.png'
import { useNavigation } from '@react-navigation/native';
import TaskList from '../../components/TaskList'
import taskData from '../../components/TaskData/taskData'

const LaterTaskScreen = () => {

  const navigation = useNavigation();

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const onBackPressed = () => {
    navigation.goBack('HomeScreen');
  }

  const handlePressItemForDoneTaskScreen = () => {
      navigation.goBack('TaskDetailsScreen');
  };

  const renderItem = ({ item }) => <TaskList item={item} onPressItem={handlePressItemForDoneTaskScreen} />;

  const groupedTasks = taskData.reduce((acc, cur) => {
    cur.data.forEach(task => {
      const dateKey = cur.title;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
    });
    return acc;
  }, {});

  const formatDate = (item) => {
    const date = new Date(item);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return 'Today';
    } else if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
      return 'Yesterday';
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };
  
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });

  return (
    <View style={styles.containerTaskDetailsScreen}>
      <View style={styles.headerTaskDetailsScreen}>

        <StatusBar barStyle={'light-content'} />

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPressed}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Later Task</Text>
          </Text>

          <View style={styles.containerIcon}>
            <TouchableOpacity>
              <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToNewTaskScreen}>
              <Image source={plusIcon} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View style={styles.searchBar}>
            <TextInput style={{ width: '90%' }} placeholder='Search Task' />
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerDoneTaskList}>
        <FlatList 
          data={sortedDates.map(date => [date, groupedTasks[date]])}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={styles.showDoneTaskList}>
              <View style={styles.dateHeader}> 
                <Text style={styles.textHeader} >{formatDate(item[0])}</Text>
              </View>
              <FlatList
                style={styles.doneTaskList}
                data={item[1]}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderItem}
              >
              </FlatList>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default LaterTaskScreen;
