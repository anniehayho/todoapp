import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import styles from './styles'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton'
import CustomLogin from '../../components/CustomLogin'
import CustomInput from '../../components/CustomInput'
import Logo from '../../assets/images/logoApp.png'
import userName from '../../assets/images/userName.png'
import passWord from '../../assets/images/passWord.png'
import facebookLogo from '../../assets/images/facebookLogo.png'
import twitterLogo from '../../assets/images/twitterLogo.png'
import googleLogo from '../../assets/images/googleLogo.png'

const LoginScreen = ({navigation}) =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions(); 

    const onLoginPressed = () => 
    {
        console.warn("Log in");
        navigation.navigate('Home');
    }

    const onLogin = (socialNetwork) => {
        console.log(`Login with ${socialNetwork}`);
      };

    return (
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode='contain'></Image>
            
            <View style={styles.containerLogin}>
                <CustomInput placeholder={"Username"} value={username} setValue={setUsername} secureTextEntry={false} leftIcon={userName}/>
                <View style={styles.divider} />
                <CustomInput placeholder={"Password"} value={password} setValue={setPassword} secureTextEntry={true} leftIcon={passWord}/>
            </View>

            <CustomButton text="LOGIN" onPress={onLoginPressed}/>

            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}> OR </Text>
                <View style={styles.line} />
            </View>
            <Text style={{marginTop:-90, color:'#ccc'}}>login using social media</Text>
            
            <View style={styles.loginSocialMedia}>
                <CustomLogin onPress={() => onLogin('facebook')} imageSource={facebookLogo} />
                <CustomLogin onPress={() => onLogin('twitter')} imageSource={twitterLogo} />
                <CustomLogin onPress={() => onLogin('google')} imageSource={googleLogo} />
            </View>
        </View>
    )
};

export default LoginScreen