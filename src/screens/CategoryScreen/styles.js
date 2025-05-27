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
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        height: getSize.s(44),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 8,
        fontSize: 16,
    },
    searchIcon: {
        width: getSize.s(20),
        height: getSize.s(20),
        tintColor: '#7646FF',
    },
    containerInformationTaskBox: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: -20,
        borderRadius: 12,
        paddingVertical: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    titleTask: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        marginHorizontal: 16,
    },
    datetimeTask: {
        marginHorizontal: 16,
        marginBottom: 12,
        color: '#666',
    },
    descriptionTask: {
        marginHorizontal: 16,
        marginBottom: 16,
        lineHeight: 20,
    },
    categoryTask: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    categoryTitle: {
        fontWeight: '600',
        fontSize: 16,
        marginRight: 8,
    },
    containerTaskDetailsNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
    },
    iconBarNavigation: {
        height: 24,
        width: 24,
        tintColor: '#7646FF',
    },
    containerDoneTaskList: {
        flex: 1,
    },
    showDoneTaskList: {
        backgroundColor: '#fff',
        marginTop: 16,
        borderRadius: 12,
        marginHorizontal: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    dateHeader: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    textHeader: {
        fontSize: 13,
        backgroundColor: '#4CD964',
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 14,
    },
})

export default styles