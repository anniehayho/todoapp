import React, { useState } from 'react'
import { View, Text, Alert, Image, useWindowDimensions } from 'react-native'
import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'
import emailIcon from '@assets/images/userName.png'
import passwordIcon from '@assets/images/passWord.png'
import userIcon from '@assets/images/userName.png'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore, setDoc, doc } from "firebase/firestore"
import firebaseConfig from '../../firebase/firebaseConfig'
import Logo from '@assets/images/logoApp.png'
import styles from './styles'
import { getSize } from '../../helpers/responsive'

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const auth = getAuth(firebaseConfig.firebase_app)
  const db = getFirestore(firebaseConfig.firebase_app)
  const {height} = useWindowDimensions()

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return false
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return false
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters')
      return false
    }
    return true
  }

  const onSignUp = async () => {
    if (!validateInputs()) return
    
    setLoading(true)
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update user profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      })

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date()
      })

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('DrawerNavigation')
        }
      ])
    } catch (error) {
      console.error('Sign up error:', error)
      Alert.alert('Sign Up Failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode='contain'/>
      <Text style={styles.subtitle}>Create your account</Text>
      
      <View style={styles.containerLogin}>
        <CustomInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          secureTextEntry={false}
          leftIcon={userIcon}
          customInputTextStyle={styles.customInputTextStyle }
        />
        <View style={styles.divider} />
        
        <CustomInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          secureTextEntry={false}
          leftIcon={userIcon}
          customInputTextStyle={styles.customInputTextStyle}
        />
        <View style={styles.divider} />
        
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
        <View style={styles.divider} />
        
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          leftIcon={passwordIcon}
          customInputTextStyle={styles.customInputTextStyle}
        />
      </View>

      <CustomButton 
        text={loading ? "SIGNING UP..." : "SIGN UP"}
        onPress={onSignUp} 
        customStyle={{ backgroundColor: '#6035D0', borderRadius: getSize.m(5)}}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>LOG IN</Text>
      </View>
    </View>
  )
}

export default SignUpScreen