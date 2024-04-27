import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './loginSlice'
import taskReducer from './tasksSlice'
import loginSaga from '../reduxsaga/Saga/loginSaga';
import taskSaga from '../reduxsaga/Saga/taskSaga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(taskSaga);