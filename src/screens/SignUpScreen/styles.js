import { StyleSheet, Platform } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: getSize.v(Platform.OS === 'android' ? 80 : 100),
        paddingHorizontal: getSize.s(50),
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: getSize.s(160),
        maxWidth: getSize.s(280),
        maxHeight: getSize.v(180),
        marginBottom: getSize.v(Platform.OS === 'android' ? 8 : 5),
    },
    title: {
        fontSize: getSize.m(28),
        fontWeight: 'bold',
        marginTop: getSize.v(25),
        color: '#333',
    },
    subtitle: {
        fontSize: getSize.m(16),
        color: '#666',
        marginTop: getSize.v(-15),
        marginBottom: getSize.v(15),
    },
    customInputTextStyle: {
        marginVertical: getSize.v(10),
    },
    containerLogin: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: getSize.m(5),
        marginVertical: getSize.v(20),
        paddingHorizontal: getSize.s(5),
    },
    divider: {
        height: 1,
        width: '90%',
        backgroundColor: '#ccc',
        margin: getSize.m(4),
        marginHorizontal: getSize.s(14),
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: getSize.v(12),
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: getSize.m(14),
    },
    loginLink: {
        color: '#6035D0',
        fontWeight: 'bold',
        fontSize: getSize.m(14),
    },
    orContainer: {
        marginVertical: getSize.v(60),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: getSize.v(40),
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        margin: getSize.m(10),
        width: getSize.s(80),
    },
    orText: {
        color: '#ccc', 
        fontSize: getSize.m(14),  
    },
    socialText: {
        color: '#ccc',
        marginBottom: getSize.v(12),
        fontSize: getSize.m(12),
    },
    loginSocialMedia: {
        paddingTop: getSize.v(30),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default styles; 