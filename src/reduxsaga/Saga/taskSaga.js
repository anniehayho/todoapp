import { call, put, takeEvery, all } from 'redux-saga/effects';
import { set_daily_tasks_success, set_weekly_tasks_success, set_monthly_tasks_success } from '../../redux/tasksSlice';
import { getDailyTask } from '../API/taskAPI';
import { getWeeklyTask } from '../API/taskAPI';
import { getMonthlyTask } from '../API/taskAPI';

function* dailyTasks() {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    const response_data = yield call(getDailyTask);
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

function* watchTasks() {
  yield takeEvery('GET_DAILY_TASKS_REQUEST', dailyTasks);
  yield takeEvery('GET_WEEKLY_TASKS_REQUEST', weeklyTasks);
  yield takeEvery('GET_MONTHLY_TASKS_REQUEST', monthlyTasks);
}

export default function* taskSaga() {
  yield all([
    watchTasks()
  ]);
}