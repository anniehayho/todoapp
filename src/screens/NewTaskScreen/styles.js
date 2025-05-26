import { Dimensions, StyleSheet, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Calculate responsive sizes
const screenHeight = height;
const statusBarHeight = Platform.OS === 'ios' ? 40 : 0;
const headerHeight = Platform.OS === 'ios' ? screenHeight * 0.13 : screenHeight * 0.15;
const contentPadding = width * 0.04; // 4% of screen width
const inputHeight = screenHeight * 0.07; // 7% of screen height
const buttonHeight = screenHeight * 0.065; // 6.5% of screen height

const styles = StyleSheet.create({
    containerNewTaskScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentNewTaskScreen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: contentPadding,
        paddingTop: contentPadding,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: buttonHeight + 20, // Add padding for button
    },
    headerNewTaskScreen: {
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
        marginTop: Platform.OS === 'ios' ? headerHeight * 0.15 : headerHeight * 0.1,
    },
    bellIcon: {
        width: width * 0.06,
        height: width * 0.06,
        tintColor: 'rgba(255, 255, 255, 0.9)'
    },
    backIcon: {
        width: width * 0.06,
        height: width * 0.06,
        tintColor: 'rgba(255, 255, 255, 0.9)'
    },
    titleApp: {
        color: '#fff',
        fontSize: width * 0.055,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginRight: width * 0.06,
        letterSpacing: 0.5,
    },
    searchBar: {
        marginHorizontal: contentPadding,
        marginTop: headerHeight * 0.15,
        marginBottom: headerHeight * 0.05,
        padding: contentPadding,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: inputHeight,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchIcon: {
        width: width * 0.05,
        height: width * 0.05,
        opacity: 0.6,
        marginLeft: 8
    },
    containerCustomInput: {
        borderColor: '#E8E8E8',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        minHeight: inputHeight,
        borderRadius: 15,
        marginBottom: contentPadding,
        paddingHorizontal: contentPadding,
        paddingVertical: contentPadding * 0.75,
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
    priorityStyle: {
        fontWeight: '600',
        fontSize: width * 0.04,
        marginLeft: 8,
        marginVertical: contentPadding * 0.75,
        color: '#333',
    },
    icon: {
        height: width * 0.08,
        width: width * 0.08,
        marginHorizontal: contentPadding * 0.5,
        opacity: 0.5
    },
    smallIcon: {
        height: width * 0.06,
        width: width * 0.06,
        marginHorizontal: contentPadding * 0.5,
        justifyContent: 'center',
        paddingHorizontal: contentPadding * 0.5
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: contentPadding * 0.5,
    },
    titleTextInput: {
        marginLeft: 4,
        marginBottom: 8,
        color: '#666',
        fontSize: width * 0.035,
        fontWeight: '500',
    },
    containerOfDescription: {
        alignSelf: 'flex-start',
        width: '100%',
        minHeight: inputHeight * 2,
    },
    textInput: {
        fontSize: width * 0.04,
        color: '#333',
        paddingVertical: 4,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
    },
    notificationOption: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.2,
        height: inputHeight * 0.8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginHorizontal: contentPadding * 0.25,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: contentPadding,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        paddingTop: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.06)',
        height: buttonHeight + (Platform.OS === 'ios' ? 45 : 35),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    }
})

export default styles;