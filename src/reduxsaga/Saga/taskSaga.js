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
  getTaskById,
} from '../API/taskAPI';

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
    const result = yield call(createTask, action.payload);
    if (result.success) {
      yield put(createTaskSuccess(result.task));
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
  yield put(setLoading(true));
  try {
    const { id, ...taskData } = action.payload;
    const result = yield call(updateTask, id, taskData);
    if (result.success) {
      yield put(updateTaskSuccess(action.payload));
      // Refresh appropriate task lists
      yield call(fetchDailyTasks);
      yield call(fetchWeeklyTasks);
      yield call(fetchMonthlyTasks);
    } else {
      yield put(setError(result.error));
    }
  } catch (error) {
    console.error('Failed to update task:', error);
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Delete task
function* deleteExistingTask(action) {
  yield put(setLoading(true));
  try {
    const result = yield call(deleteTask, action.payload);
    if (result.success) {
      yield put(deleteTaskSuccess(action.payload));
    } else {
      yield put(setError(result.error));
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
      yield call(fetchDoneTasks); // Refresh done tasks
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
      yield call(fetchLaterTasks); // Refresh later tasks
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