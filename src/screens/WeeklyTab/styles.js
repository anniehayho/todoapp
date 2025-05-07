import { Dimensions, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerWeekly: {
        paddingTop: 10,
        alignItems: 'center',
        position: 'relative',
        height: height,
    },
    headerSchedule: {
        fontWeight: 'bold',
        marginTop: getSize.v(10),
        fontSize: getSize.m(15),
        display: 'flex',
    },
    containterDatePicker: {
        backgroundColor: '#7646FF',
        width: width,
        marginTop: 10,
        justifyContent: 'center',
        height: '6%',
    },
    arrayDatePicker: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        overflow: 'visible',
    },
    containerEachDate: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 9,
        position: 'relative',
        overflow: 'visible' 
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
        zIndex: -100
    },
    containerSectionList: {
        height: '63%',
    },
    titleSectionList: {
        fontSize: 15,
        color: 'blue',
        textAlign: 'center',
        marginVertical: 5
    }

});

export default styles;
