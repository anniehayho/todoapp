import { firebase_app } from '../../firebase/firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';

const auth = getAuth(firebase_app);
export const getUser = async (email, password) => {
   try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  // try {
  //   const response = await firebase_auth.signInWithEmailAndPassword(email, password);
  //   console.log('response', response);
  //   return response;  
  // } catch (error) {
  //   return error;
  // }
}
