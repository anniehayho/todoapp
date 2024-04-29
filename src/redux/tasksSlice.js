import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: "task",
  initialState: {
    dailyTasks: {title: '', data: []},
    weeklyTasks: [{title: '', data: []}],
    monthlyTasks: [{title: '', data: []}],
    doneTasks: [],
    laterTasks: [],
    error: null,
  },
  reducers: {
    set_daily_tasks_success: (state, action) => {
      state.dailyTasks = action.payload
    },
    set_weekly_tasks_success: (state, action) => {
      state.weeklyTasks = action.payload
    },
    set_monthly_tasks_success: (state, action) => {
      state.monthlyTasks = action.payload
    },
    markTaskDone: (state, action) => {
      const task = action.payload;
      state.doneTasks.push(task);
      state.dailyTasks.data = state.dailyTasks.data.filter(item => item.id !== task.id);
    },
    markTaskLater: (state, action) => {
      const task = action.payload;
      state.laterTasks.push(task);
      state.dailyTasks.data = state.dailyTasks.data.filter(item => item.id !== task.id);
    },
    createNewTask: (state, action) => {
      state.dailyTasks.push(action.payload);
    },
  },
})

export const { set_daily_tasks_success, set_weekly_tasks_success, set_monthly_tasks_success, markTaskDone, markTaskLater, createNewTask } = taskSlice.actions

export default taskSlice.reducer
