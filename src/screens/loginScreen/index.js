import React, { useState } from 'react'
import { View, Text, Image, useWindowDimensions, Alert } from 'react-native'
import styles from './styles'
import CustomButton from '@components/CustomButton'
import CustomLogin from '@components/CustomLogin'
import CustomInput from '@components/CustomInput'
import Logo from '@assets/images/logoApp.png'
import emailIcon from '@assets/images/userName.png'
import passwordIcon from '@assets/images/passWord.png'
import facebookLogo from '@assets/images/facebookLogo.png'
import twitterLogo from '@assets/images/twitterLogo.png'
import googleLogo from '@assets/images/googleLogo.png'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../../firebase/firebaseConfig';
import { getSize } from '../../helpers/responsive';

const LoginScreen = () => {
  const {height} = useWindowDimensions(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth(firebaseConfig.firebase_app);

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      navigation.navigate('DrawerNavigation');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onLogin = (socialNetwork) => {
    console.log(`Login with ${socialNetwork}`);
    Alert.alert('Coming Soon', `${socialNetwork} login will be available in future updates.`);
  };

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode='contain'/>
      <View style={styles.containerLogin}>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          secureTextEntry={false}
          leftIcon={emailIcon}
          customInputTextStyle={styles.customInputTextStyle}
        />
        <View style={styles.divider} />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={passwordIcon}
          customInputTextStyle={styles.customInputTextStyle}
        />
      </View>

      <CustomButton 
        text={loading ? "LOGGING IN..." : "LOG IN"} 
        onPress={onSubmit} 
        customStyle={{backgroundColor: '#6035D0', borderRadius: getSize.m(5)}}
      />
      <CustomButton 
        text="SIGN UP" 
        onPress={onSignUp} 
        customStyle={{backgroundColor: 'lightgray', borderRadius: getSize.m(5)}} 
        customText={{color: '#6035D0'}}
      />

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}> OR </Text>
        <View style={styles.line} />
      </View>

      <Text style={{ marginTop: getSize.v(-60), color:'#ccc', fontSize: getSize.m(12) }}>login using social media</Text>
      
      <View style={styles.loginSocialMedia}>
        <CustomLogin onPress={() => onLogin('Facebook')} imageSource={facebookLogo} />
        <CustomLogin onPress={() => onLogin('Twitter')} imageSource={twitterLogo} />
        <CustomLogin onPress={() => onLogin('Google')} imageSource={googleLogo} />
      </View>
    </View>
  )
};

export default LoginScreen