import { Dimensions, StyleSheet, Platform } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width, height } = Dimensions.get("window");

// Calculate responsive sizes
const screenHeight = height;
const statusBarHeight = Platform.OS === 'ios' ? 40 : 0;
const headerHeight = Platform.OS === 'ios' ? screenHeight * 0.13 : screenHeight * 0.15;
const contentPadding = width * 0.04;
const inputHeight = screenHeight * 0.07;

const styles = StyleSheet.create({
    containerTaskDetailsScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTaskDetailsScreen: {
        backgroundColor: '#7646FF',
        height: headerHeight + statusBarHeight,
        paddingTop: statusBarHeight,
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
        width: width * 0.1,
        height: width * 0.1,
        tintColor: 'rgba(255, 255, 255, 0.9)',
        marginRight: contentPadding
    },   
    plusIcon: {
        width: width * 0.08,
        height: width * 0.08,
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
    containerInformationTaskBox: {
        backgroundColor: '#fff',
        marginHorizontal: contentPadding,
        marginTop: getSize.s(15),
        borderRadius: 15,
        padding: contentPadding,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    titleTask: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#333',
        marginBottom: contentPadding * 0.5,
    },
    datetimeTask: {
        fontSize: width * 0.035,
        color: '#666',
        marginBottom: contentPadding,
    },
    descriptionTask: {
        fontSize: width * 0.04,
        color: '#333',
        marginBottom: contentPadding,
        lineHeight: width * 0.06,
    },
    categoryTask: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: contentPadding * 0.5,
    },
    categoryTitle: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#333',
        marginRight: contentPadding * 0.5,
    },
    categoryValue: {
        fontSize: width * 0.04,
        color: '#666',
    },
    priorityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: contentPadding,
    },
    priorityTitle: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#333',
        marginRight: contentPadding * 0.5,
    },
    priorityValue: {
        fontSize: width * 0.04,
        color: '#666',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: contentPadding,
    },
    statusTitle: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#333',
        marginRight: contentPadding * 0.5,
    },
    statusValue: {
        fontSize: width * 0.04,
        color: '#7646FF',
        fontWeight: '500',
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
        paddingVertical: contentPadding,
        paddingBottom: Platform.OS === 'ios' ? 30 : contentPadding,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.06)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    iconBarNavigation: {
        width: width * 0.07,
        height: width * 0.07,
        tintColor: '#7646FF',
        opacity: 0.8,
    }
})

export default styles;