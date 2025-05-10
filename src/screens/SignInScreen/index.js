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
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { firebase_app } from '../../firebase/firebaseConfig'

const SignInScreen = () => {
  const { control } = useForm()
  const { height } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const auth = getAuth(firebase_app)

  const onSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigation.navigate('DrawerNavigation')
    } catch (error) {
      Alert.alert('Sign In Failed', error.message)
    }
  }

  const onSocialSignIn = (socialNetwork) => {
    console.log(`Sign in with ${socialNetwork}`)
  }

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.2 }]} resizeMode='contain' />
      <View style={styles.containerLogin}>
        <Controller
          control={control}
          render={() => (
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              secureTextEntry={false}
              leftIcon={emailIcon}
              customInputTextStyle={{ marginVertical: 15 }}
            />
          )}
          name="email"
          defaultValue=""
        />
        <View style={styles.divider} />
        <Controller
          control={control}
          render={() => (
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
              leftIcon={passwordIcon}
              customInputTextStyle={{ marginVertical: 15 }}
            />
          )}
          name="password"
          defaultValue=""
        />
      </View>

      <CustomButton 
        text="SIGN IN" 
        onPress={onSignIn} 
        customStyle={{ backgroundColor: '#6035D0' }}
      />
      <CustomButton 
        text="LOG IN" 
        onPress={() => navigation.navigate('Login')} 
        customStyle={{ backgroundColor: 'lightgray' }} 
        customText={{ color: '#6035D0' }}
      />

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}> OR </Text>
        <View style={styles.line} />
      </View>

      <Text style={{ marginTop: -90, color: '#ccc' }}>sign in using social media</Text>

      <View style={styles.loginSocialMedia}>
        <CustomLogin onPress={() => onSocialSignIn('facebook')} imageSource={facebookLogo} />
        <CustomLogin onPress={() => onSocialSignIn('twitter')} imageSource={twitterLogo} />
        <CustomLogin onPress={() => onSocialSignIn('google')} imageSource={googleLogo} />
      </View>
    </View>
  )
}

export default SignInScreen