import { StyleSheet, Platform } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: getSize.v(Platform.OS === 'android' ? 100 : 120),
        paddingHorizontal: getSize.s(50),
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: getSize.s(160),
        maxWidth: getSize.s(280),
        maxHeight: getSize.v(180),
        marginBottom: getSize.v(Platform.OS === 'android' ? 15 : 10),
    },
    containerLogin: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: getSize.m(5),
        marginVertical: getSize.v(25),
        paddingHorizontal: getSize.s(5),
    },
    customInputTextStyle: {
        marginVertical: getSize.v(10),
    },
    divider: {
        height: 1,
        width: '90%',
        backgroundColor: '#ccc',
        margin: getSize.m(4),
        marginHorizontal: getSize.s(14),
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        margin: getSize.m(10),
        width: getSize.s(80),
    },
    orContainer: {
        marginVertical: getSize.v(60),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: getSize.v(40), 
    },
    orText: {
        color: '#ccc', 
        fontSize: getSize.m(14),  
    },
    loginSocialMedia: {
        paddingTop: getSize.v(30),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default styles