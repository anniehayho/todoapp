import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create ({
    containerHome: {
        flex: 1,
        backgroundColor: '#F6F6F8'
    },
    tabView: {
        flex: 1,
    },
    containerHeader: {
        backgroundColor: '#7646FF',
        width: '100%',
        height: '28%',
    },
    headerBar: {
        display: 'flex',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginLeft: 10

    },
    menuIcon: {
        width: getSize.s(40),
        height: getSize.s(22),
        marginTop: getSize.s(5)
    },
    titleApp: {
        color: '#fff',
        fontSize: 20,
        marginTop: getSize.s(5),
        marginLeft: getSize.s(10), 
    },
    appIcon: {
        width: getSize.s(20),
        height: getSize.s(20),
        marginTop: getSize.s(5),
        marginLeft: getSize.s(2),
    },
    containerIconHeaderBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 125,
    },
    bellIcon: {
        width: getSize.s(40),
        height: getSize.s(40),
        marginTop: getSize.s(10),
        marginLeft: getSize.s(-10)
    },
    plusIcon: {
        width: getSize.s(25),
        height: getSize.s(25),
        marginTop: getSize.s(10),
        marginLeft: getSize.s(10),
    },
    searchBar: {
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
    }
});

export default styles;