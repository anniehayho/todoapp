import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    containerTabView: {

    },
    containerSubTabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    tabItem: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleTabView: {
        fontSize: 20,
        color: '#fff',
        alignContent: 'center',
    },
    lineTabView: {
        position: 'relative',
        width: '100%',
        height: 3,
        backgroundColor: '#fff',
        marginTop: 20
    },
});

export default styles;
