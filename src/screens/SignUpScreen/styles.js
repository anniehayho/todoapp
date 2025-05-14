import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: 140,
        paddingHorizontal: 70,
        backgroundColor: 'white',
    },
    logo: {
        width: 180,
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginTop: -20,
        marginBottom: 20,
    },
    containerLogin: {
        width: '120%',
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
    loginContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
    },
    loginLink: {
        color: '#6035D0',
        fontWeight: 'bold',
    },
    orContainer: {
        marginVertical: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        margin: 10,
        width: 100,
    },
    orText: {
        color: '#ccc', 
        fontSize: 16,  
    },
    socialText: {
        color: '#ccc',
        marginBottom: 15,
    },
    loginSocialMedia: {
        paddingTop: 50,
        flex: 1,
        flexDirection: 'row',
    },
});

export default styles; 