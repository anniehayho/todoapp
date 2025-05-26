import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    containerInformationToday: {
        backgroundColor: '#fff',
        width: '90%',
        height: 150,
        marginVertical: 20,
        marginHorizontal: 20,
        borderColor: '#F6F6F8',
        shadowOpacity: 0.08,
        borderRadius: 8,
    },
    greetContainer: {
        flexDirection: 'row', 
        alignItems:'flex-start', 
        height: getSize.s(60)
    },
    greetHeader: {
        fontSize: 20,
        padding: 20,
    }, 
    containerDailyContent: {
        height: '72%'
    },
    hiddenItemContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: 300,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#7646FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default styles;