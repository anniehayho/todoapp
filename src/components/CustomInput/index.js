import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import styles from './styles'

const CustomInput = ({value, setValue, placeholder, secureTextEntry, leftIcon}) =>
{
    return (
        <View>
            <View style={styles.inputContainer}>
                <Image source={leftIcon} style={styles.icon} />
                <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                styles={styles.inputText}
                secureTextEntry={secureTextEntry}>
                </TextInput>
            </View>
        </View>
    )
};

export default CustomInput