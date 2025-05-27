import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";
const styles = StyleSheet.create({
    customButton: {
        flexDirection: 'row',
        height: getSize.s(40),
        alignItems: 'center',
    },
    textButton: {
        fontSize: getSize.m(18),
        fontWeight: '500',
        color: '#7646FF',
    },
    icon: {
        width: getSize.s(30),
        height: getSize.s(30),
        marginHorizontal: getSize.s(20),
        tintColor: '#7646FF',
    },
    divider: {
        height: 1,
        width: '90%',
        backgroundColor: '#ccc',
        margin: 4,
        marginHorizontal: 14,
    },
})

export default styles;