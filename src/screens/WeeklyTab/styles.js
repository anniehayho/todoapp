import { StyleSheet, Dimensions } from 'react-native';
import { getSize } from '../../helpers/responsive';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerWeeklyTab: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: getSize.m(30),
    },
    weeklyTab: {
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
    containerWeeklyContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerSchedule: {
        fontWeight: '600',
        marginTop: getSize.v(10),
        fontSize: getSize.m(13),
        color: '#7646FF',
        marginBottom: 5,
    },
    containterDatePicker: {
        backgroundColor: '#fff',
        width: width,
        justifyContent: 'center',
        height: getSize.m(60),
        borderRadius: getSize.m(15),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    arrayDatePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getSize.m(20),
        overflow: 'visible',
    },
    containerEachDate: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: getSize.m(12),
        position: 'relative',
        overflow: 'visible',
        borderRadius: getSize.m(10),
    },
    date: {
        fontSize: getSize.m(10),
        color: '#666',
        marginBottom: getSize.m(4),
    },
    markIcon: {
        width: getSize.m(32),
        height: getSize.m(32),
        position: 'absolute',
        bottom: getSize.m(0),
        tintColor: '#7646FF',
        opacity: 0.2,
    },
    containerSectionList: {
        height: '63%',
    },
    titleSectionList: {
        fontSize: getSize.m(15),
        color: '#7646FF',
        textAlign: 'center',
        marginVertical: getSize.m(6),
        fontWeight: '600',
    },
    activeDateContainer: {
        backgroundColor: '#7646FF',
        borderRadius: getSize.m(10),
        paddingVertical: getSize.m(8),
        paddingHorizontal: getSize.m(12),
    },
    activeDate: {
        color: '#fff',
        fontWeight: '600',
    },
    weekday: {
        fontSize: getSize.m(10),
        color: '#666',
        marginBottom: getSize.m(6),
        textTransform: 'uppercase',
    },
    dateNumber: {
        fontSize: getSize.m(10),
        fontWeight: '500',
    },
    weekCalendar: {
        marginBottom: getSize.m(15),
        borderRadius: getSize.m(15),
        overflow: 'hidden',
    },
});

export default styles;
