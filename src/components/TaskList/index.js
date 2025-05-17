import React, { useState } from 'react';
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import importantStarIcon from '@assets/images/importantStarIcon.png';
import unimportantStarIcon from '@assets/images/unimportantStarIcon.png';
import redIcon from '@assets/images/redIcon.png';
import blueIcon from '@assets/images/blueIcon.png';
import greenIcon from '@assets/images/greenIcon.png';
import orangeIcon from '@assets/images/orangeIcon.png';
import styles from './styles';
import { useDispatch } from 'react-redux';

const renderColorIcon = (priority, color) => {
  if (color) {
    switch (color.toLowerCase()) {
      case 'red':
        return redIcon;
      case 'blue':
        return blueIcon;
      case 'green':
        return greenIcon;
      case 'orange':
        return orangeIcon;
      default:
        return greenIcon;
    }
  }
  
  switch (priority) {
    case '1':
      return redIcon;
    case '2':
      return orangeIcon;
    case '3':
      return blueIcon;
    case '4':
      return greenIcon;
    default:
      return greenIcon;
  }
};

const TaskList = ({ item, onPressItem }) => {
  const [task, setTask] = useState(item);
  const dispatch = useDispatch();

  const handlePressItem = () => {
    onPressItem(item);
  };

  const toggleStarred = (e) => {
    e.stopPropagation();
    const updatedStarred = !task.starred;
    
    // Update local state first for immediate feedback
    setTask({ ...task, starred: updatedStarred });
    
    // Dispatch update to backend
    requestAnimationFrame(() => {
      dispatch({ 
        type: 'UPDATE_TASK_REQUEST', 
        payload: { 
          id: task.id, 
          starred: updatedStarred 
        },
        meta: {
          isPriority: true
        }
      });
    });
  };

  const getPeriod = (hour) => {
    return hour >= 12 ? 'PM' : 'AM';
  };

  let displayTime = '';
  let period = 'AM';
  
  if (task.time) {
    const timeParts = task.time.split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);
    period = getPeriod(hour);
    const displayHour = hour > 12 ? (hour - 12).toString().padStart(2, '0') : (hour === 0 ? 12 : hour).toString().padStart(2, '0');
    displayTime = `${displayHour}:${minute.toString().padStart(2, '0')}`;
  }

  return (
    <TouchableOpacity onPress={handlePressItem}>
      <View style={styles.containerBoxTask}>
        <View style={styles.containerLeftBoxTask}>
          <Text style={styles.timerBoxTask}>{displayTime}</Text>
          <Text style={[styles.titleBoxTask, { fontWeight: 'bold', paddingLeft: 7 }]}>{period}</Text>
        </View>

        <View style={styles.containerCenterBoxTask}>
          <Text style={[styles.titleBoxTask, 
            task.status === 'Done' ? styles.doneTaskText : null
          ]}>
            {task.taskName}
          </Text>
          <Text>{task.type}</Text>
        </View>

        <View style={styles.containerRightBoxTask}>
          <View style={styles.containerRightIcon}>
            <Pressable 
              onPress={toggleStarred} 
              hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}
              style={{ opacity: 1 }}
            >
              <Image 
                source={task.starred ? importantStarIcon : unimportantStarIcon} 
                style={styles.starIconBoxTask} 
              />
            </Pressable>
            <Image source={renderColorIcon(item.priority, item.color)} style={styles.colorIcon} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskList;