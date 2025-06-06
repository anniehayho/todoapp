import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  setLoading,
  setError,
  setDailyTasksSuccess,
  setWeeklyTasksSuccess,
  setMonthlyTasksSuccess,
  setImportantTasksSuccess,
  setDoneTasksSuccess,
  setLaterTasksSuccess,
  createTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  markTaskDoneSuccess,
  markTaskLaterSuccess,
} from '../../redux/tasksSlice';
import {
  getDailyTasks,
  getWeeklyTasks,
  getMonthlyTasks,
  getImportantTasks,
  getDoneTasks,
  getLaterTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskAsDone,
  markTaskForLater,
} from '../API/taskAPI';
import NotificationService from '../../services/NotificationService';

// Get daily tasks
function* fetchDailyTasks() {
  yield put(setLoading(true));
  try {
    const response = yield call(getDailyTasks);
    yield put(setDailyTasksSuccess(response));
  } catch (error) {
    console.error('Failed to fetch daily tasks:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Get weekly tasks
function* fetchWeeklyTasks() {
  yield put(setLoading(true));
  try {
    const response = yield call(getWeeklyTasks);
    yield put(setWeeklyTasksSuccess(response));
  } catch (error) {
    console.error('Failed to fetch weekly tasks:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Get monthly tasks
function* fetchMonthlyTasks() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMonthlyTasks);
    yield put(setMonthlyTasksSuccess(response));
  } catch (error) {
    console.error('Failed to fetch monthly tasks:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Get important tasks
function* fetchImportantTasks() {
  yield put(setLoading(true));
  try {
    const response = yield call(getImportantTasks);
    yield put(setImportantTasksSuccess(response));
  } catch (error) {
    console.error('Failed to fetch important tasks:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Get done tasks
function* fetchDoneTasks() {
  yield put(setLoading(true));
  try {
    const response = yield call(getDoneTasks);
    yield put(setDoneTasksSuccess(response));
  } catch (error) {
    console.error('Failed to fetch done tasks:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Get later tasks
function* fetchLaterTasks() {
  yield put(setLoading(true));
  try {
    const response = yield call(getLaterTasks);
    yield put(setLaterTasksSuccess(response));
  } catch (error) {
    console.error('Failed to fetch later tasks:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Create new task
function* createNewTask(action) {
  yield put(setLoading(true));
  try {
    // Serialize the dateTime object if it exists and has a non-serializable format
    let taskData = { ...action.payload };
    if (taskData.dateTime && typeof taskData.dateTime === 'object' && taskData.dateTime.seconds) {
      taskData.dateTime = {
        seconds: taskData.dateTime.seconds,
        nanoseconds: taskData.dateTime.nanoseconds
      };
    }
    
    const result = yield call(createTask, taskData);
    if (result.success) {
      yield put(createTaskSuccess(result.task));
      
      // Schedule notifications for the newly created task
      try {
        yield call([NotificationService, 'scheduleTaskNotifications'], result.task);
        console.log('Notifications scheduled for task:', result.task.taskName);
      } catch (notificationError) {
        console.error('Failed to schedule notifications:', notificationError);
        // Don't fail the entire task creation if notification scheduling fails
      }
      
      yield call(fetchDailyTasks); // Refresh tasks
    } else {
      yield put(setError(result.error));
    }
  } catch (error) {
    console.error('Failed to create task:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Update task
function* updateExistingTask(action) {
  const { id, ...taskData } = action.payload;
  const isPriorityUpdate = action.meta && action.meta.isPriority;
  const isStarUpdate = Object.keys(taskData).length === 1 && 'starred' in taskData;
  
  // Nếu là cập nhật star thì không hiện loading
  if (!isStarUpdate) {
    yield put(setLoading(true));
  }
  
  try {
    // Serialize the dateTime object if it exists and has a non-serializable format
    let serializedTaskData = { ...taskData };
    if (serializedTaskData.dateTime && typeof serializedTaskData.dateTime === 'object' && serializedTaskData.dateTime.seconds) {
      serializedTaskData.dateTime = {
        seconds: serializedTaskData.dateTime.seconds,
        nanoseconds: serializedTaskData.dateTime.nanoseconds
      };
    }
    
    // Đối với cập nhật star, dispatch action success ngay lập tức để cải thiện UI
    if (isStarUpdate) {
      // Cập nhật UI trước (optimistic update)
      yield put(updateTaskSuccess(action.payload));
    }
    
    const result = yield call(updateTask, id, serializedTaskData);
    
    if (result.success) {
      // Chỉ dispatch success nếu không phải là star update (vì đã dispatch ở trên)
      if (!isStarUpdate) {
        yield put(updateTaskSuccess(action.payload));
      }
      
      // Ưu tiên refresh danh sách task quan trọng nếu là star update
      if (isStarUpdate) {
        yield call(fetchImportantTasks);
      }
      
      // Chỉ refresh các danh sách khác nếu không phải update ưu tiên
      if (!isPriorityUpdate) {
        yield call(fetchDailyTasks);
        yield call(fetchWeeklyTasks);
        yield call(fetchMonthlyTasks);
      }
      
      // Handle navigation if specified in meta
      if (action.meta && action.meta.navigateTo) {
        // Navigation would be handled in the component using useEffect
      }
    } else {
      // If it's a network error, set a specific error message
      if (result.isNetworkError) {
        yield put(setError('Network Error: The device appears to be offline. Please check your connection and try again.'));
      } else {
        yield put(setError(result.error || 'Unknown error during task update'));
      }
    }
  } catch (error) {
    console.error('Failed to update task:', error);
    yield put(setError(error.message));
  } finally {
    if (!isStarUpdate) {
      yield put(setLoading(false));
    }
  }
}

// Delete task
function* deleteExistingTask(action) {
  yield put(setLoading(true));
  try {
    const result = yield call(deleteTask, action.payload);
    
    if (result.success) {
      // Clear notifications for the deleted task
      try {
        yield call([NotificationService, 'clearTaskNotifications'], action.payload);
        console.log('Notifications cleared for deleted task:', action.payload);
      } catch (notificationError) {
        console.error('Failed to clear notifications for deleted task:', notificationError);
        // Don't fail the entire task deletion if notification clearing fails
      }
      
      yield put(deleteTaskSuccess(action.payload));
      
      // Handle navigation if specified in meta
      if (action.meta && action.meta.navigateTo) {
        // Navigation would be handled in the component using useEffect
      }
    } else {
      // If it's a network error, set a specific error message
      if (result.isNetworkError) {
        yield put(setError('Network Error: The device appears to be offline. Please check your connection and try again.'));
      } else {
        yield put(setError(result.error || 'Unknown error during task deletion'));
      }
    }
  } catch (error) {
    console.error('Failed to delete task:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Mark task as done
function* markTaskDone(action) {
  yield put(setLoading(true));
  try {
    const { id } = action.payload;
    const result = yield call(markTaskAsDone, id);
    if (result.success) {
      const updatedTask = { ...action.payload, status: 'Done' };
      yield put(markTaskDoneSuccess(updatedTask));
      yield call(fetchDailyTasks); // Refresh daily tasks
      yield call(fetchDoneTasks); // Refresh done tasks
      
      // Handle navigation if specified in meta
      if (action.meta && action.meta.navigateTo) {
        // Navigation would be handled in the component using useEffect
      }
    } else {
      yield put(setError(result.error));
    }
  } catch (error) {
    console.error('Failed to mark task as done:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Mark task for later
function* markTaskLater(action) {
  yield put(setLoading(true));
  try {
    const { id } = action.payload;
    const result = yield call(markTaskForLater, id);
    if (result.success) {
      const updatedTask = { ...action.payload, status: 'Later' };
      yield put(markTaskLaterSuccess(updatedTask));
      yield call(fetchDailyTasks); // Refresh daily tasks
      yield call(fetchLaterTasks); // Refresh later tasks
      
      // Handle navigation if specified in meta
      if (action.meta && action.meta.navigateTo) {
        // Navigation would be handled in the component using useEffect
      }
    } else {
      yield put(setError(result.error));
    }
  } catch (error) {
    console.error('Failed to mark task for later:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Watch for task actions
function* watchTasks() {
  yield takeEvery('GET_DAILY_TASKS_REQUEST', fetchDailyTasks);
  yield takeEvery('GET_WEEKLY_TASKS_REQUEST', fetchWeeklyTasks);
  yield takeEvery('GET_MONTHLY_TASKS_REQUEST', fetchMonthlyTasks);
  yield takeEvery('GET_IMPORTANT_TASKS_REQUEST', fetchImportantTasks);
  yield takeEvery('GET_DONE_TASKS_REQUEST', fetchDoneTasks);
  yield takeEvery('GET_LATER_TASKS_REQUEST', fetchLaterTasks);
  yield takeEvery('CREATE_TASK_REQUEST', createNewTask);
  yield takeEvery('UPDATE_TASK_REQUEST', updateExistingTask);
  yield takeEvery('DELETE_TASK_REQUEST', deleteExistingTask);
  yield takeEvery('MARK_TASK_DONE_REQUEST', markTaskDone);
  yield takeEvery('MARK_TASK_LATER_REQUEST', markTaskLater);
}

export default function* taskSaga() {
  yield all([
    watchTasks()
  ]);
}