import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerInformationToday: {
        backgroundColor: '#fff',
        width: '90%',
        height: 150,
        marginVertical: 20,
        marginHorizontal: 20,
        borderColor: '#F6F6F8',
        shadowOpacity: 0.08
    },
    greetContainer: {
        flexDirection: 'row', 
        alignItems:'flex-start', 
        height: 60
    },
    greetHeader: {
        fontSize: 20,
        padding: 20,
    }, 
    containerDailyContent: {
        // backgroundColor: 'purple',
        height: '72%'
    }
});

export default styles;