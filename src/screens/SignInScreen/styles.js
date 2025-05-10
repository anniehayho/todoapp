import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: 140,
        paddingHorizontal: 70
    },
    logo: {
        width: 180,
        maxWidth: 300,
        maxHeight: 200,
    },
    containerLogin: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 30,
    },
    divider: {
        height: 1,
        width: '90%',
        backgroundColor: '#ccc',
        margin: 4,
        marginHorizontal: 14,
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        margin: 10,
        width: 100,
    },
    orContainer: {
        marginVertical: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50, 
    },
    orText: {
        color: '#ccc', 
        fontSize: 16,  
    },
    loginSocialMedia: {
        paddingTop: 50,
        flex: 1,
        flexDirection: 'row',
    },
});

export default styles;