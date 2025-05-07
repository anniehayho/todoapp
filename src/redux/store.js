import { configureStore } from '@reduxjs/toolkit'
import userReducer from './loginSlice'
import taskReducer from './tasksSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  }
})