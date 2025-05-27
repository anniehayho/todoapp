import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import importantStarIcon from '@assets/images/importantStarIcon.png';
import unimportantStarIcon from '@assets/images/unimportantStarIcon.png';
import redIcon from '@assets/images/redIcon.png';
import blueIcon from '@assets/images/blueIcon.png';
import greenIcon from '@assets/images/greenIcon.png';
import orangeIcon from '@assets/images/orangeIcon.png';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { getSize } from '../../helpers/responsive';

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

  // Sync local state with prop changes from Redux
  useEffect(() => {
    setTask(item);
  }, [item]);

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
      <View style={[
        styles.containerBoxTask,
        task.status === 'Done' ? styles.doneTaskContainer : null
      ]}>
        {task.status === 'Done' && (
          <View style={styles.doneTaskIndicator} />
        )}
        
        <View style={styles.containerLeftBoxTask}>
          <Text style={[
            styles.timerBoxTask,
            task.status === 'Done' ? styles.doneTaskText : null
          ]}>
            {displayTime}
          </Text>
          <Text style={[
            styles.titleBoxTask, 
            { fontWeight: 'bold', paddingLeft: getSize.s(7) },
            task.status === 'Done' ? styles.doneTaskText : null
          ]}>
            {period}
          </Text>
        </View>

        <View style={styles.containerCenterBoxTask}>
          <Text style={[styles.titleBoxTask, 
            task.status === 'Done' ? styles.doneTaskText : 
            task.status === 'Later' ? styles.laterTaskText : null
          ]}>
            {task.taskName}
          </Text>
          <Text style={[
            { color: task.status === 'Done' ? '#888' : 'black' }
          ]}>
            {task.type}
          </Text>
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

TaskList.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    taskName: PropTypes.string,
    type: PropTypes.string,
    time: PropTypes.string,
    status: PropTypes.string,
    starred: PropTypes.bool,
    priority: PropTypes.string,
    color: PropTypes.string
  }),
  onPressItem: PropTypes.func
};

export default TaskList;