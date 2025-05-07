import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";
const styles = StyleSheet.create({
    customButton: {
        flexDirection: 'row',
        height: getSize.s(35),
        alignItems: 'center',
    },
    textButton: {
        fontSize: getSize.m(18),
        fontWeight: '500',
    },
    icon: {
        width: getSize.s(30),
        height: getSize.s(30),
        marginHorizontal: getSize.s(20),
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