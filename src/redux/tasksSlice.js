import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: "task",
  initialState: {
    dailyTasks: {data: []},
    weeklyTasks: {data: [ {data: []} ]},
    monthlyTasks: {data: [ {data: []} ]},
    doneTasks: {data: [ {data: []} ]},
    laterTasks: {data: [ {data: []} ]},
    error: null,  
    selectedTask: null,
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
      state.doneTasks.data.push(task);
      // state.dailyTasks.data = state.dailyTasks.data.filter(item => item.id !== task.id);
    },
    markTaskLater: (state, action) => {
      const task = action.payload;
      state.laterTasks.data.push(task);
      // state.dailyTasks.data = state.dailyTasks.data.filter(item => item.id !== task.id);
    },
    selectedTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
})

export const { set_daily_tasks_success, set_weekly_tasks_success, set_monthly_tasks_success, markTaskDone, markTaskLater, selectedTask } = taskSlice.actions

export default taskSlice.reducer
