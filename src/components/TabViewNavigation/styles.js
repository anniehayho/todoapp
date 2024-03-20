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
        marginTop: 25
    },
    // containerInformationToday: {
    //     backgroundColor: '#fff',
    //     width: '90%',
    //     height: 150,
    //     marginTop: 20,
    //     marginHorizontal: 20,
    //     borderColor: '#F6F6F8',
    //     shadowOpacity: 0.08
    // },
    // greetContainer: {
    //     flexDirection: 'row', 
    //     alignItems:'flex-start', 
    //     height: 60
    // },
    // greetHeader: {
    //     fontSize: 20,
    //     padding: 20,
    // }
});

export default styles;
