import axios from "axios";

export async function getDailyTask() {
    try {
      const response = await axios.get('http://localhost:3000/tasks/todayTask')
      if (response && response.data.tasks) {
        return { data: response.data.tasks };
      } else {
        console.error('No response or response.data.tasks');
        return { data: [] };
      }
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
}

export async function getWeeklyTask() {
    try {
      const response =  await axios.get('http://localhost:3000/tasks/weeklyTask');
      if (response && response.data.tasks) {
        return { data: response.data.tasks };
      } else {
        console.error('No response or response.data.tasks');
        return { data: [] };
      }
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
}

export async function getMonthlyTask() {
    try {
      const response = await axios.get('http://localhost:3000/tasks/monthlyTask');
      if (response && response.data.tasks) {
        return { data: response.data.tasks };
      } else {
        console.error('No response or response.data.tasks');
        return { data: [] };
      }
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
}