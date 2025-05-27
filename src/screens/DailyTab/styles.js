import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    containerInformationToday: {
        backgroundColor: '#fff',
        width: '90%',
        height: getSize.m(150),
        marginVertical: getSize.m(20),
        marginHorizontal: getSize.m(20),
        borderColor: '#F6F6F8',
        shadowOpacity: 0.08,
        borderRadius: getSize.m(8),
    },
    greetContainer: {
        flexDirection: 'row', 
        alignItems:'flex-start', 
        height: getSize.m(60)
    },
    greetHeader: {
        fontSize: getSize.m(15),
        padding: getSize.m(20),
    }, 
    containerDailyContent: {
        height: '72%'
    },
    hiddenItemContainer: {
        height: getSize.m(60),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: getSize.m(300),
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: getSize.m(300),
    },
    errorText: {
        color: 'red',
        marginBottom: getSize.m(20),
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#7646FF',
        paddingHorizontal: getSize.m(20),
        paddingVertical: getSize.m(10),
        borderRadius: getSize.m(5),
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default styles;