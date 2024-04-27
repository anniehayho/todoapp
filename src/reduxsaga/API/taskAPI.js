import axios from "axios";

export async function getDailyTask() {
    try {
      const response = await axios.get('https://49ef2f407b1a481c975bc32f3e99ffde.api.mockbin.io/')
      if (response && response.data) {
        return response.data;
      } else {
        console.error('No response or response.data');
      }
    } catch (error) {
      console.error(error);
    }
}

export async function getWeelyTask() {
    try {
      const response =  await axios.get('https://9d424140653742b8a28e2ce599d9e369.api.mockbin.io/');
      if (response && response.data) {
        return response.data;
      } else {
        console.error('No response or response.data');
      }
    } catch (error) {
      console.error(error);
    }
}

export async function getMonthlyTask() {
    try {
      const response = await axios.get('https://9d424140653742b8a28e2ce599d9e369.api.mockbin.io/');
      if (response && response.data) {
        return response.data;
      } else {
        console.error('No response or response.data');
      }
    } catch (error) {
      console.error(error);
    }
}