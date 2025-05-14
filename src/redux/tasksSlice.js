import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: "task",
  initialState: {
    dailyTasks: { data: [] },
    weeklyTasks: { data: [] },
    monthlyTasks: { data: [] },
    importantTasks: { data: [] },
    doneTasks: { data: [] },
    laterTasks: { data: [] },
    loading: false,
    error: null,
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Daily tasks
    setDailyTasksSuccess: (state, action) => {
      state.dailyTasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Weekly tasks
    setWeeklyTasksSuccess: (state, action) => {
      state.weeklyTasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Monthly tasks
    setMonthlyTasksSuccess: (state, action) => {
      state.monthlyTasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Important tasks
    setImportantTasksSuccess: (state, action) => {
      state.importantTasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Done tasks
    setDoneTasksSuccess: (state, action) => {
      state.doneTasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Later tasks
    setLaterTasksSuccess: (state, action) => {
      state.laterTasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Create task
    createTaskSuccess: (state, action) => {
      state.dailyTasks.data.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    
    // Update task
    updateTaskSuccess: (state, action) => {
      const { id, ...updatedData } = action.payload;
      
      // Update in appropriate task lists
      ['dailyTasks', 'weeklyTasks', 'monthlyTasks', 'importantTasks', 'doneTasks', 'laterTasks'].forEach(listName => {
        if (Array.isArray(state[listName].data)) {
          state[listName].data = state[listName].data.map(task => 
            task.id === id ? { ...task, ...updatedData } : task
          );
        }
      });
      
      state.loading = false;
      state.error = null;
    },
    
    // Delete task
    deleteTaskSuccess: (state, action) => {
      const taskId = action.payload;
      
      // Remove from all task lists
      ['dailyTasks', 'weeklyTasks', 'monthlyTasks', 'importantTasks', 'doneTasks', 'laterTasks'].forEach(listName => {
        if (Array.isArray(state[listName].data)) {
          state[listName].data = state[listName].data.filter(task => task.id !== taskId);
        }
      });
      
      state.loading = false;
      state.error = null;
    },
    
    // Mark task as done
    markTaskDoneSuccess: (state, action) => {
      const task = action.payload;
      state.doneTasks.data.push(task);
      state.dailyTasks.data = state.dailyTasks.data.filter(item => item.id !== task.id);
      state.loading = false;
      state.error = null;
    },
    
    // Mark task for later
    markTaskLaterSuccess: (state, action) => {
      const task = action.payload;
      state.laterTasks.data.push(task);
      state.dailyTasks.data = state.dailyTasks.data.filter(item => item.id !== task.id);
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
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
} = taskSlice.actions;

export default taskSlice.reducer;