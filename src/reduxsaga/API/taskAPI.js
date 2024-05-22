import axios from "axios";

export async function getDailyTask(payload) {
    try {
      const response = await axios.get(`http://localhost:3000/tasks/todayTask/${payload}`)
      console.log('payload test', payload)
      if (response && response.data.tasks) {
        return response.data.tasks;
      } else {
        console.error('No response or response.data.tasks');
      }
    } catch (error) {
      console.error(error);
    }
}

export async function getWeeklyTask() {
    try {
      const response =  await axios.get('http://localhost:3000/tasks/weeklyTask/2');
      if (response && response.data.tasks) {
        return response.data.tasks;
      } else {
        console.error('No response or response.data.tasks');
      }
    } catch (error) {
      console.error(error);
    }
}

export async function getMonthlyTask() {
    try {
      const response = await axios.get('http://localhost:3000/tasks/monthlyTask/2');
      if (response && response.data.tasks) {
        return response.data.tasks;
      } else {
        console.error('No response or response.data.tasks');
      }
    } catch (error) {
      console.error(error);
    }
}

export async function updateTask(payload) {
  try {
    console.log('payload: ', payload)
    const response = await axios.put(`http://localhost:3000/tasks/updateTask/${payload.id}`, payload.data);
    if (response) {
      return response;
    } else {
      console.error('No response or response.data.tasks');
    }
  } catch (error) {
    console.error(error);
  }
}


export async function deleteTask(payload) {
  try {
    console.log('payload: ', payload)
    const response = await axios.put(`http://localhost:3000/tasks/deleteTask/${payload}`);
    if (response) {
      return response;
    } else {
      console.error('No response or response.data.tasks');
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createNewTask(task) {
    try {
      const response = await axios.post('http://localhost:3000/tasks/new', task);
      return response;
    } catch (error) {
      console.error(error);
    }
}