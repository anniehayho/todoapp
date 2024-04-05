/* eslint-disable react/prop-types */
import React from 'react';
import { View, TextInput, Image } from 'react-native';
import styles from './styles'

const CustomInput = ({ onChangeText, value, placeholder, secureTextEntry, leftIcon, rightIcon,  customInputTextStyle }) => {
    return (
        <View>
            <View style={[styles.inputContainer]}>
                <Image source={leftIcon} style={styles.icon} />
                <TextInput 
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    style={[styles.inputText, customInputTextStyle]}
                    secureTextEntry={secureTextEntry}>
                </TextInput>
                <Image source={rightIcon} style={styles.icon} />
            </View>
        </View>
    )
};

export default CustomInput;
