import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");


const styles = StyleSheet.create({
    containerMonthlyTab: {
        height: '110%',
    },
    monthlyTab: {
        width: width,
        height: height * 0.31,
        backgroundColor: '#F6F6F8'
    },
    monthlyCalendar: {
        width: width,
        height: width * 0.5,
    },
    titleSectionList: {
        fontSize: 15,
        color: 'blue',
        textAlign: 'center',
        marginVertical: 6
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
        marginBottom: 10,
    },
    containerMonthlyContent: {
        height: '52.5%'
    }
});

export default styles;
