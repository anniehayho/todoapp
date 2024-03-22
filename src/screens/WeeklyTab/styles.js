import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerWeekly: {
        paddingVertical: 10,
        alignItems: 'center',
        position: 'relative',
        height: '150%'
    },
    headerSchedule: {
        fontWeight: 'bold',
        fontSize: 18,
        display: 'flex',
        paddingVertical: 2,
    },
    containterDatePicker: {
        backgroundColor: '#7646FF',
        width: width,
        marginTop: 10,
        justifyContent: 'center',
        height: '8%',

    },
    arrayDatePicker: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        overflow: 'visible'
    },
    containerEachDate: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 9,
        position: 'relative',
        overflow: 'visible' // Thêm thuộc tính position: 'relative' cho phần tử cha
    },
    date: {
        fontSize: 15,
        color: '#fff',
    },
    markIcon: {
        width: 90,
        height:90,
        position: 'absolute',
        marginTop: -10,
        zIndex: -1
    },
    sectionListContent: {
        marginTop: 2,
    },
    titleSectionList: {
        fontSize: 15,
        color: 'blue',
        textAlign: 'center',
        marginVertical: 5
    }

});

export default styles;
