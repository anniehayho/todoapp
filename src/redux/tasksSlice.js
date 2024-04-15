import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: "task",
  initialState: {
    dailyTasks: [], 
    weeklyTasks: [],
    monthlyTasks: []
  },
  reducers: {
    get_daily_tasks_success: (state, action) => {
      state.dailyTasks = action.payload
    },
    get_weekly_tasks_success: (state, action) => {
      state.weeklyTasks = action.payload
    },
    get_monthly_tasks_success: (state, action) => {
      state.monthlyTasks = action.payload
    },
  },
})

export const { get_daily_tasks_success, get_weekly_tasks_success, get_monthly_tasks_success } = taskSlice.actions

export default taskSlice.reducer
