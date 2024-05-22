import { call, put, takeEvery, all } from 'redux-saga/effects';
import { set_daily_tasks_success, set_weekly_tasks_success, set_monthly_tasks_success } from '../../redux/tasksSlice';
import { getDailyTask } from '../API/taskAPI';
import { getWeeklyTask } from '../API/taskAPI';
import { getMonthlyTask } from '../API/taskAPI';
import { createNewTask } from '../API/taskAPI';
import { updateTask } from '../API/taskAPI';
import { deleteTask } from '../API/taskAPI';

function* dailyTasks(action) {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    const response_data = yield call(getDailyTask, action.payload);
    yield put(set_daily_tasks_success(response_data));
  } catch (error) {
    console.log('Get Daily Task Failed', error);
  }
  yield put({ type: 'SET_LOADING', payload: false });
}

function* weeklyTasks() {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    const response_data = yield call(getWeeklyTask);
    yield put(set_weekly_tasks_success(response_data));
  } catch {
    console.log('Get Weekly Task Failed');
  }
  yield put({ type: 'SET_LOADING', payload: false });
}

function* monthlyTasks() {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    const response_data = yield call(getMonthlyTask);
    yield put(set_monthly_tasks_success(response_data));
  } catch {
    console.log('Get Monthly Task Failed');
  }
  yield put({ type: 'SET_LOADING', payload: false });
}

function* newTask(action) {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    const response_data = yield call(createNewTask, action.payload);
    console.log('action test', action)
    console.log('response_data', response_data);
    // yield put(set_daily_tasks_success(response_data));
  } catch {
    console.log('Create New Task Failed');
  }
  yield put({ type: 'SET_LOADING', payload: false });
}

function* update(action) {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    console.log('action.payload', action.payload)
    const response = yield call(updateTask, action.payload);
 
    console.log('response_data', response);
    // yield put(set_daily_tasks_success(response_data));
  } catch {
    console.log('Create New Task Failed');
  }
  yield put({ type: 'SET_LOADING', payload: false });
}


function* deletetask(action) {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    console.log('action.payload', action.payload)
    const response = yield call(deleteTask, action.payload);
 
    console.log('response_data', response);
    // yield put(set_daily_tasks_success(response_data));
  } catch {
    console.log('Create New Task Failed');
  }
  yield put({ type: 'SET_LOADING', payload: false });
}

function* watchTasks() {
  yield takeEvery('GET_DAILY_TASKS_REQUEST', dailyTasks);
  yield takeEvery('GET_WEEKLY_TASKS_REQUEST', weeklyTasks);
  yield takeEvery('GET_MONTHLY_TASKS_REQUEST', monthlyTasks);
  yield takeEvery('CREATE_NEW_TASK_REQUEST', newTask);
  yield takeEvery('UPDATE_TASK_REQUEST', update);
  yield takeEvery('DELETE_TASK_REQUEST', deletetask);
}

export default function* taskSaga() {
  yield all([
    watchTasks()
  ]);
}