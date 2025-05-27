import { Dimensions, StyleSheet, Platform } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width, height } = Dimensions.get("window");

// Calculate responsive sizes
const screenHeight = height;
const statusBarHeight = Platform.OS === 'ios' ? 40 : 0;
const headerHeight = Platform.OS === 'ios' ? screenHeight * 0.13 : screenHeight * 0.15;
const contentPadding = width * 0.04;

const styles = StyleSheet.create({
    containerTaskDetailsScreen: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    headerTaskDetailsScreen: {
        backgroundColor: '#7646FF',
        height: headerHeight + statusBarHeight,
        paddingTop: statusBarHeight + getSize.s(10),
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,
        elevation: 6,
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: contentPadding,
        height: headerHeight * 0.7,
        marginTop: headerHeight * 0.25,
    },
    backIcon: {
        width: width * 0.06,
        height: width * 0.06,
        tintColor: 'rgba(255, 255, 255, 0.9)'
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        width: width * 0.105,
        height: width * 0.105,
        tintColor: 'rgba(255, 255, 255, 0.9)',
    },   
    plusIcon: {
        width: width * 0.07,
        height: width * 0.07,
        tintColor: 'rgba(255, 255, 255, 0.9)'
    },
    titleApp: {
        color: '#fff',
        fontSize: width * 0.055,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginRight: width * 0.01,
        letterSpacing: 0.5,
    },
    searchBar: {
        marginRight: getSize.m(15),
        paddingLeft: getSize.m(15), 
        backgroundColor: '#fff', 
        borderRadius: 6, 
        width: '100%', 
        height: getSize.s(40), 
        flexDirection: 'row',
    },
    searchIcon: {
        width: getSize.s(25), 
        height: getSize.s(25), 
        marginRight: getSize.m(10),
        marginTop: getSize.m(10),
    },
    searchInput: {
        width: '90%',
        height: '100%',
        paddingLeft: getSize.s(10),
    },
    containerImportantTaskList: {
        width: width,
        height: '80%'
    },
    showImportantTaskList: {
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