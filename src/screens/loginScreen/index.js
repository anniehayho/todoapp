/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text, Image, useWindowDimensions } from 'react-native'
import styles from './styles'
import CustomButton from '@components/CustomButton'
import CustomLogin from '@components/CustomLogin'
import CustomInput from '@components/CustomInput'
import Logo from '@assets/images/logoApp.png'
import userName from '@assets/images/userName.png'
import passWord from '@assets/images/passWord.png'
import facebookLogo from '@assets/images/facebookLogo.png'
import twitterLogo from '@assets/images/twitterLogo.png'
import googleLogo from '@assets/images/googleLogo.png'
import { useForm, Controller } from 'react-hook-form';

const LoginScreen = ({ navigation }) =>
{
    const { control } = useForm();
    const {height} = useWindowDimensions(); 

    const onLoginPressed = () => 
    {
        console.warn("Log in");
        navigation.navigate('DrawerNavigation');
        
    }

    const onLogin = (socialNetwork) => {
        console.log(`Login with ${socialNetwork}`);
      };

    return (
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode='contain'/>
            
            <View style={styles.containerLogin}>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <CustomInput
                            placeholder="Username"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry={false}
                            leftIcon={userName}
                            customInputTextStyle={{ marginVertical: 15 }}
                        />
                    )}
                    name="username"
                    defaultValue=""
                />
                <View style={styles.divider} />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <CustomInput
                            placeholder="Password"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry={true}
                            leftIcon={passWord}
                            customInputTextStyle={{ marginVertical: 15 }}
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
            </View>

            <CustomButton text="LOGIN" onPress={onLoginPressed} customStyle={{backgroundColor: '#6035D0'}}/>

            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}> OR </Text>
                <View style={styles.line} />
            </View>
            <Text style={{ marginTop:-90, color:'#ccc' }}>login using social media</Text>
            
            <View style={styles.loginSocialMedia}>
                <CustomLogin onPress={() => onLogin('facebook')} imageSource={facebookLogo} />
                <CustomLogin onPress={() => onLogin('twitter')} imageSource={twitterLogo} />
                <CustomLogin onPress={() => onLogin('google')} imageSource={googleLogo} />
            </View>
        </View>
    )
};

export default LoginScreen