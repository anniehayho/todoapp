import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: "task",
  initialState: {
    dailyTasks: [], 
    weeklyTasks: [],
    monthlyTasks: [],
    laterTasks: [],
    doneTasks: []
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
    markTaskDone: (state, action) => {
      const task = action.payload;
      state.doneTasks.push(task);
      state.dailyTasks = state.dailyTasks.filter(item => item.id !== task.id);

    },
    markTaskLater: (state, action) => {
      const task = action.payload;
      state.laterTasks.push(task);
      state.dailyTasks = state.dailyTasks.filter(item => item.id !== task.id);
    }
  },
})

export const { get_daily_tasks_success, get_weekly_tasks_success, get_monthly_tasks_success, markTaskDone, markTaskLater } = taskSlice.actions

export default taskSlice.reducer
