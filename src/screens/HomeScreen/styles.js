import { StyleSheet, Platform, Dimensions } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width, height } = Dimensions.get("window");

// Calculate responsive sizes
const screenHeight = height;
const statusBarHeight = Platform.OS === 'ios' ? 40 : 0;
const headerHeight = Platform.OS === 'ios' ? screenHeight * 0.13 : screenHeight * 0.15;
const contentPadding = width * 0.04;

const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#F6F6F8'
    },
    tabView: {
        flex: 1,
    },
    containerHeader: {
        backgroundColor: '#7646FF',
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
        marginTop: Platform.OS === 'ios' ? headerHeight * 0.3 : headerHeight * 0.1,
    },
    menuIcon: {
        width: width * 0.07,
        height: width * 0.07,
        tintColor: 'rgba(255, 255, 255, 0.9)'
    },
    titleApp: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    appIcon: {
        width: width * 0.05,
        height: width * 0.05,
        marginTop: getSize.s(2),
        marginLeft: getSize.s(2),
    },
    containerIconHeaderBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        width: width * 0.1,
        height: width * 0.1,
        tintColor: 'rgba(255, 255, 255, 0.9)'
    },
    plusIcon: {
        width: width * 0.06,
        height: width * 0.06,
        tintColor: 'rgba(255, 255, 255, 0.9)',
    },
    searchBar: {
        marginHorizontal: contentPadding,
        backgroundColor: '#fff', 
        borderRadius: 12, 
        height: getSize.s(40), 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: contentPadding,
    },
    searchIcon: {
        width: getSize.s(20), 
        height: getSize.s(20),
    },
    searchInput: {
        flex: 1,
        height: '100%',
        marginLeft: contentPadding/2,
        fontSize: width * 0.035,
    },
});

export default styles;