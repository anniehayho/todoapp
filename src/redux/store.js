import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import taskReducer from './tasksSlice'
import loginSaga from '../reduxsaga/Saga/loginSaga';
import taskSaga from '../reduxsaga/Saga/taskSaga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    loading: (state = false, action) => {
      if (action.type === 'SET_LOADING') {
        return action.payload;
      }
      return state;
    }
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(taskSaga);