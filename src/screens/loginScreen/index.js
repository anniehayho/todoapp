/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import { View, Text, Image, useWindowDimensions } from 'react-native'
import styles from './styles'
import CustomButton from '@components/CustomButton'
import CustomLogin from '@components/CustomLogin'
import CustomInput from '@components/CustomInput'
import Logo from '@assets/images/logoApp.png'
import usernameIcon from '@assets/images/userName.png'
import passwordIcon from '@assets/images/passWord.png'
import facebookLogo from '@assets/images/facebookLogo.png'
import twitterLogo from '@assets/images/twitterLogo.png'
import googleLogo from '@assets/images/googleLogo.png'
import { useForm, Controller } from 'react-hook-form';
import { loginFailed, loginSuccess } from '../../redux/loginSlice'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const LoginScreen = () =>
{
    const { control } = useForm();
    const {height} = useWindowDimensions(); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onSubmit = () => {
        if (username == "Annie" && password == "admin") {
            dispatch(loginSuccess({username}))
            setPassword("")
            navigation.navigate('DrawerNavigation')
        } else {
            dispatch(loginFailed())
        }
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
                    render={() => (
                        <CustomInput
                            placeholder="Username"
                            value={username}
                            onChangeText={(username)=>setUsername(username)}
                            secureTextEntry={false}
                            leftIcon={usernameIcon}
                            customInputTextStyle={{ marginVertical: 15 }}
                        />
                    )}
                    name="username"
                    defaultValue=""
                />
                <View style={styles.divider} />
                <Controller
                    control={control}
                    render={() => (
                        <CustomInput
                            placeholder="Password"
                            value={password}
                            onChangeText={(password)=>setPassword(password)}
                            secureTextEntry={true}
                            leftIcon={passwordIcon}
                            customInputTextStyle={{ marginVertical: 15 }}
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
            </View>

            <CustomButton text="LOGIN" onPress={onSubmit} customStyle={{backgroundColor: '#6035D0'}}/>

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