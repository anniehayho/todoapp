import { Dimensions, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")


const styles = StyleSheet.create({
    containerNewTaskScreen: {
        width: width,
        height: height
    },
    headerNewTaskScreen: {
        backgroundColor: '#7646FF',
        display: 'flex',
        height: '20%',
    },
    headerBar: {
        flexDirection: 'row',
        marginTop: getSize.s(55),
        justifyContent: 'space-between',
        marginHorizontal: getSize.s(15)
    },
    bellIcon: {
        width: getSize.s(40),
        height: getSize.s(40),
    },
    backIcon: {
        width: getSize.s(25),
        height: getSize.s(25),
        marginTop: getSize.s(10)
    },
    titleApp: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20, 
        flexBasis: 100,
        flexGrow: 0,
        flexShrink: 0,
    },
    searchBar: {
        marginRight: 15,
        padding: 10, 
        paddingLeft: 15, 
        backgroundColor: '#fff', 
        borderRadius: 6, 
        width: '100%', 
        height: 45, 
        flexDirection: 'row',
    },
    searchIcon: {
        width: 25, 
        height: 25, 
        marginLeft: 10, 
        alignItems: 'baseline'
    },
    containerCustomInput: {
        borderColor: 'lightgray',
        borderWidth: 0.5,
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'center',
    },
    priorityStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20,
        marginVertical: 10,
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 20,
        opacity: 0.5
    },
    smallIcon: {
        height: 22,
        width: 22,
        marginLeft: 24,
        marginTop: 4,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    containerIcon: {
        flexDirection: 'row',
        marginVertical: 10,
    },
})

export default styles;