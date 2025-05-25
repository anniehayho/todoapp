import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")


const styles = StyleSheet.create({
    containerNewTaskScreen: {
        width: width,
        height: height
    },
    contentNewTaskScreen: {
        backgroundColor: '#f8f8f8',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
    },
    headerNewTaskScreen: {
        backgroundColor: '#7646FF',
        display: 'flex',
        height: '20%',
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    headerBar: {
        flexDirection: 'row',
        marginTop: 55,
        justifyContent: 'flex-start',
    },
    bellIcon: {
        width: 50,
        height: 50,
        marginLeft: 190,
    },
    backIcon: {
        width: 25,
        height: 25,
        marginLeft: 20,
        marginTop: 10
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
        justifyContent: 'center',
        height: 60
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
    titleTextInput: {
        marginLeft: 20,
        marginTop: 10,
        color: 'lightgray',
    },
    containerOfDescription: {
        alignSelf: 'flex-start',
        width: '100%',
        marginLeft: -20,
    },
    textInput: {
        paddingBottom: 10
    },
    notificationOption: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        height: 40,
    },
    editButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#f8f8f8',
    },
})

export default styles;