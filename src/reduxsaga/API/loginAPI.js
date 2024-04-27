import axios from "axios";

export async function getUser() {
    try {
      const response = await axios.get('https://7a081996baa244838daf135e2902a285.api.mockbin.io/');
      return response;
    } catch (error) {
      console.error(error);
    }
}