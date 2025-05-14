import React, { useState } from 'react'
import { View, Text, Alert, Image, useWindowDimensions } from 'react-native'
import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'
import emailIcon from '@assets/images/userName.png'
import passwordIcon from '@assets/images/passWord.png'
import userIcon from '@assets/images/userName.png'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebase_app } from '../../firebase/firebaseConfig'
import Logo from '@assets/images/logoApp.png'
import styles from './styles'

const SignUpScreen = () => {
  const { control } = useForm()
  const [fullName, setFullName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigation = useNavigation()
  const auth = getAuth(firebase_app)
  const {height} = useWindowDimensions(); 


  const onSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: displayName || fullName
      })
      navigation.navigate('DrawerNavigation')
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message)
    }
  }


  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode='contain'/>
      <Text style={styles.subtitle}>Create your account</Text>
      
      <View style={styles.containerLogin}>
        <Controller
          control={control}
          render={() => (
            <CustomInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              secureTextEntry={false}
              leftIcon={userIcon}
              customInputTextStyle={{ marginVertical: 15 }}
            />
          )}
          name="fullName"
          defaultValue=""
        />
        <View style={styles.divider} />
        
        <Controller
          control={control}
          render={() => (
            <CustomInput
              placeholder="Display Name"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              secureTextEntry={false}
              leftIcon={userIcon}
              customInputTextStyle={{ marginVertical: 15 }}
            />
          )}
          name="displayName"
          defaultValue=""
        />
        <View style={styles.divider} />
        
        <Controller
          control={control}
          render={() => (
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
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
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              leftIcon={passwordIcon}
              customInputTextStyle={{ marginVertical: 15 }}
            />
          )}
          name="password"
          defaultValue=""
        />
        <View style={styles.divider} />
        
        <Controller
          control={control}
          render={() => (
            <CustomInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              leftIcon={passwordIcon}
              customInputTextStyle={{ marginVertical: 15 }}
            />
          )}
          name="confirmPassword"
          defaultValue=""
        />
      </View>

      <CustomButton 
        text="SIGN UP" 
        onPress={onSignUp} 
        customStyle={{ backgroundColor: '#6035D0', width: '120%', borderRadius: 5}}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>LOG IN</Text>
      </View>
    </View>
  )
}

export default SignUpScreen 