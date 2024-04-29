import axios from "axios";

export async function getUser() {
    try {
      const response = await axios.get('https://7a081996baa244838daf135e2902a285.api.mockbin.io/');
      // const response = await axios.get('https://7072f54c718c43b685788e5e2f0a194c.api.mockbin.io/');
      return response;
    } catch (error) {
      console.error(error);
    }
}