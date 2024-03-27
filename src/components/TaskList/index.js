import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import importantStarIcon from '../../assets/images/importantStarIcon.png';
import unimportantStarIcon from '../../assets/images/unimportantStarIcon.png';
import redIcon from '../../assets/images/redIcon.png';
import blueIcon from '../../assets/images/blueIcon.png';
import greenIcon from '../../assets/images/greenIcon.png';
import orangeIcon from '../../assets/images/orangeIcon.png';
import styles from './styles';

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

const TaskList = ({ item }) => {
  const [task, setTask] = useState(item);

  const toggleStarIcon = () => {
    setTask({ ...task, starred: !task.starred });
  };

  // Hàm để tính toán và trả về chuỗi AM hoặc PM dựa trên giờ
  const getPeriod = (hour) => {
    return hour >= 12 ? 'PM' : 'AM';
  };

  // Chuyển đổi giờ từ chuỗi sang số
  const timeParts = item.time.split(':');
  const hour = parseInt(timeParts[0], 10);
  const minute = parseInt(timeParts[1], 10);

  // Xác định chuỗi AM hoặc PM
  const period = getPeriod(hour);
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
          <Pressable onPress={toggleStarIcon}>
            <Image source={task.starred ? importantStarIcon : unimportantStarIcon} style={styles.starIconBoxTask} />
          </Pressable>
          <Image source={renderColorIcon(item.color)} style={styles.colorIcon} />
        </View>
      </View>
    </View>
  );
};

export default TaskList;

