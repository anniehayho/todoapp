import { Dimensions, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")

const styles = StyleSheet.create({
    containerTaskDetailsScreen: {
        width: width,
        height: height,
        backgroundColor: '#EFEFEF',
    },
    headerTaskDetailsScreen: {
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
    backIcon: {
        width: getSize.s(20),
        height: getSize.s(20),
        marginTop: getSize.s(20),
        marginLeft: getSize.s(20)
    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 145,
    },
    bellIcon: {
        width: getSize.s(40),
        height: getSize.s(40),
        marginTop: getSize.s(10),
        marginLeft: getSize.s(-50)
    },   
    plusIcon: {
        width: getSize.s(25),
        height: getSize.s(25),
        marginTop: getSize.s(10),
    },
    titleApp: {
        color: '#fff',
        fontSize: getSize.m(20),
        marginTop: getSize.s(18),
        marginLeft: getSize.s(18),
    },
    searchBar: {
        marginTop: getSize.s(-10),
        padding: 10, 
        paddingLeft: getSize.s(15), 
        backgroundColor: '#fff', 
        borderRadius: 6, 
        height: getSize.s(40), 
        flexDirection: 'row',
    },
    searchInput: {
        width: '90%',
        height: '100%',
        paddingLeft: getSize.s(10),
    },
    searchIcon: {
        width: getSize.s(25), 
        height: getSize.s(25), 
        marginRight: getSize.s(5), 
        alignItems: 'baseline'
    },
    containerDoneTaskList: {
        width: width,
        height: '80%'
    },
    showDoneTaskList: {
        backgroundColor: '#fff',
        marginTop: 20,
    },
    dateHeader: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textHeader: {
        fontSize: 12,
        backgroundColor: 'yellow',
        color: 'black',
        paddingHorizontal: 10,
        height: 20,
        paddingTop: 3,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: 300,
    },
    emptyText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    addTaskButton: {
        backgroundColor: '#7646FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    addTaskButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default styles;