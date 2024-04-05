import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window")

const styles = StyleSheet.create( {
    calendar: {
        width: width,
        backgroundColor: '#fff',
        paddingBottom: 16,
    },
    title: {
        flexDirection: 'row',
        color: '#172735',
        width: width,
        height: 40,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        justifyContent: 'space-between'
    },
    monthYear: {
        flexDirection: 'row',
        color: '#111',
        fontSize: 17,
        fontWeight: 'bold',
    },
    icon:{
        color: '#111',
        fontSize: 30,
    },
    daysOfWeek: {
        marginTop: 15,
        marginBottom: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#111',
        fontWeight: 'bold',
        paddingHorizontal: 24,
    },
    week: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    day: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    daysContainer: {
        marginTop: 10,
    },
    emptyDay: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    dayNumber: {
        color: '#111',
        fontSize: 16,
    },
    selectedDay: {
        backgroundColor: '#f2c94c',
    }
})

export default styles;