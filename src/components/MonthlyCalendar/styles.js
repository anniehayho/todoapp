import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    calendar: {
        backgroundColor: '#fff',
        paddingBottom: getSize.m(16),
        borderRadius: getSize.m(15),
    },
    title: {
        marginTop: getSize.m(10),
        flexDirection: 'row',
        backgroundColor: '#7646FF',
        height: getSize.m(40),
        marginHorizontal: getSize.m(16),
        paddingHorizontal: getSize.m(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: getSize.m(12),
    },
    monthYear: {
        color: '#fff',
        fontSize: getSize.m(13),
        fontWeight: '600',
    },
    icon: {
        color: '#fff',
        fontSize: getSize.m(25),
        opacity: 0.9,
    },
    arrowButton: {
        width: getSize.m(30),
        height: getSize.m(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getSize.m(-10),
    },
    daysOfWeek: {
        marginTop: getSize.m(10),
        marginBottom: getSize.m(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: getSize.m(24),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: getSize.m(10),
    },
    dayOfWeek: {
        color: '#666',
        fontSize: getSize.m(10),
        fontWeight: '600',
        width: getSize.m(35),
        textAlign: 'center',
    },
    week: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 8,
        justifyContent: 'space-between',
    },
    day: {
        width: getSize.m(35),
        height: getSize.m(35),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    daysContainer: {
        marginTop: 5,
    },
    emptyDay: {
        width: getSize.m(35),
        height: getSize.m(35),
        borderRadius: 10,
    },
    dayNumber: {
        fontSize: getSize.m(14),
        fontWeight: '500',
    },
    selectedDay: {
        backgroundColor: '#7646FF',
    },
    selectedDayText: {
        color: '#fff',
        fontWeight: '600',
    },
    todayCell: {
        backgroundColor: '#f0f0ff',
    },
    todayText: {
        color: '#7646FF',
        fontWeight: '600',
    },
    inactiveMonthText: {
        color: '#ccc',
    }
});

export default styles;