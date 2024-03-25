import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    customButton: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 15,
        marginLeft: 10
    },
    textButton: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 15,
        marginTop: 10,
        marginHorizontal: 10,
    }
})

export default styles;