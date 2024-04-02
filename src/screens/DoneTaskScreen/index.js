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

const TaskDetailsScreen = () => {

  const navigation = useNavigation();

  const navigateToNewTaskScreen = () => {
    navigation.navigate('NewTaskScreen')
  }

  const onBackPressed = () => {
    navigation.goBack('HomeScreen');
  }

  const handlePressItemForDoneTaskScreen = () => {
    navigation.navigate('DoneTaskScreen');
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

  return (
    <View style={styles.containerTaskDetailsScreen}>
      <View style={styles.headerTaskDetailsScreen}>

        <StatusBar barStyle={'light-content'} />

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPressed}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Task Details</Text>
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

      <View>
        <FlatList
          data={Object.entries(groupedTasks)}
          keyExtractor={(item) => item[0]} // Sử dụng ngày làm key
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{item[0]}</Text>
              <FlatList
                data={item[1]}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderItem}
              />
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default TaskDetailsScreen;
