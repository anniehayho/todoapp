/* eslint-disable react/prop-types */
import React from 'react';
import { View, TextInput, Image } from 'react-native';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomInput = ({ onChangeText, value, placeholder, secureTextEntry, leftIcon, rightIcon,  customInputTextStyle, showDateTimePicker, onDateTimeChange }) => {
    return (
        <View>
            <View style={[styles.inputContainer]}>
                <Image source={leftIcon} style={styles.icon} />
                {showDateTimePicker ? (
                    <DateTimePicker
                        value={value ? new Date(value) : new Date()}
                        mode="datetime"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            onDateTimeChange(selectedDate);
                        }}
                    />
                ) : (
                    <TextInput 
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        style={[styles.inputText, customInputTextStyle]}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                    />
                )}
                <Image source={rightIcon} style={styles.icon} />
            </View>
        </View>
    )
};

export default CustomInput;
