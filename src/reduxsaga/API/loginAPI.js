import { firebase_auth } from '../../firebase/firebaseConfig'

export const getUser = async (email, password) => {
  try {
    const response = await firebase_auth.signInWithEmailAndPassword(email, password);
    return response;  
  } catch (error) {
    return error;
  }
}
