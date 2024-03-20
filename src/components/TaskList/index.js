import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import importantStarIcon from '../../assets/images/importantStarIcon.png';
import unimportantStarIcon from '../../assets/images/unimportantStarIcon.png';
import taskData from '../TaskData/taskData.js'; 
import redIcon from '../../assets/images/redIcon.png'
import blueIcon from '../../assets/images/blueIcon.png'
import greenIcon from '../../assets/images/greenIcon.png'
import orangeIcon from '../../assets/images/orangeIcon.png'
import styles from './styles.js'

const TaskList = () => {
    const [tasks, setTasks] = useState(taskData);

    const toggleStarIcon = (taskId) => {
        setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, starred: !task.starred } : task
        ));
    };

    const renderColorIcon = (color) => {
        switch (color) {
        case 'red':
            return redIcon;
        case 'blue':
            return blueIcon;
        case 'green': 
            return greenIcon; 
        case 'orange': 
            return orangeIcon; 
        default:
            return orangeIcon;
        }
    };

    const renderItem = ({ item }) => {
        // Chuyển đổi giờ từ chuỗi sang số
        const timeParts = item.time.split(':');
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);

        // Xác định nếu là AM hoặc PM
        const period = hour >= 12 ? 'PM' : 'AM';
        // Chuyển đổi giờ sang định dạng 12 giờ
        // const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        // Định dạng lại thời gian hiển thị
        // const displayTime = `${displayHour}:${minute < 10 ? '0' + minute : minute} `;

        const displayHour = hour > 12 ? (hour - 12).toString().padStart(2, '0') : (hour === 0 ? 12 : hour).toString().padStart(2, '0');

        const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')}`;


        return (
        <View style={styles.containerBoxTask}>
            <View style={styles.containerLeftBoxTask}>
            <Text style={styles.timerBoxTask}>{displayTime}</Text>
            <Text style={[styles.titleBoxTask, { fontWeight: 'bold', paddingLeft: 7 }]}>{period}</Text>
            </View>
            <View style={styles.containerCenterBoxTask}> 
            <Text style={styles.titleBoxTask}>{item.title}</Text>
            <Text>{item.type}</Text>
            </View>
            <View style={styles.containerRightBoxTask}>
            <View style={styles.containerRightIcon}>
                <Pressable onPress={() => toggleStarIcon(item.id)}>
                <Image source={item.starred ? importantStarIcon : unimportantStarIcon} style={styles.starIconBoxTask} />
                </Pressable>
                <Image source={renderColorIcon(item.color)} style={styles.colorIcon} />
            </View>
            </View>
        </View>
        );
    };

    return (
        <View style={styles.containerFlatList}>
        <FlatList
          renderItem={renderItem}
          data={tasks} 
          keyExtractor={item => item.id.toString()} 
        />
      </View>
    )
}
export default TaskList;