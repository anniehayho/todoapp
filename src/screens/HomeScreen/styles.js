import { StyleSheet } from "react-native";

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
        alignItems: 'flex-start',
        marginTop: 60,
        paddingLeft: 10,
    },
    menuIcon: {
        width: 50,
        height: 50,
        marginTop: 5
    },
    titleApp: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10, 
        flexBasis: 100,
        flexGrow: 0,
        flexShrink: 0,
    },
    appIcon: {
        width: 20,
        height: 20,
        marginTop: 5,
        marginLeft: 2,
    },
    bellIcon: {
        width: 50,
        height: 50,
        marginLeft: 150,
        marginTop: 4,
    },
    plusIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginTop: 14
    },
    searchBar: {
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
    }
});

export default styles;