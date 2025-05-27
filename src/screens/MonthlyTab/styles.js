import { Dimensions, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerMonthlyTab: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: getSize.m(30),
    },
    monthlyTab: {
        width: width,
        backgroundColor: '#fff',
        borderRadius: getSize.m(15),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        zIndex: 1,
    },
    monthlyCalendar: {
        width: width,
        height: width * 0.6,
        backgroundColor: '#fff',
    },
    titleSectionList: {
        fontSize: getSize.m(15),
        color: '#7646FF',
        textAlign: 'center',
        marginVertical: getSize.m(6),
        fontWeight: '600',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    calendar: {
        marginBottom: getSize.m(15),
        borderRadius: getSize.m(15),
        overflow: 'hidden',
    },
    containerMonthlyContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    monthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: getSize.m(10),
        paddingHorizontal: getSize.m(15),
        backgroundColor: '#7646FF',
        borderRadius: getSize.m(10),
        marginBottom: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    weekdayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    weekdayText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    dayCell: {
        width: (width - 60) / 7,
        height: (width - 60) / 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    dayText: {
        fontSize: 14,
        color: '#333',
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
    }
});

export default styles;
