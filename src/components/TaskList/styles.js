import { StyleSheet, Dimensions } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerFlatList: {
        marginTop: 20,
        height: '100%',
    },
    containerBoxTask: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: width,
        height: 60,
        borderColor: 'lightgray',
        borderWidth: 0.5,
        position: 'relative',
    },
    doneTaskContainer: {
        opacity: 0.6,
        backgroundColor: '#f8f8f8',
    },
    doneTaskIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#4CD964',
        zIndex: 1,
    },
    containerLeftBoxTask: {
        width: '12%',
        marginLeft: 20,
        justifyContent: 'center'
    },
    containerCenterBoxTask: {
        width: '60%',
        marginLeft: getSize.m(10)
    },
    containerRightBoxTask: {
        width: '25%',
    },
    containerRightIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: getSize.m(20),
        alignItems: 'center' 
    },
    starIconBoxTask: {
        width: getSize.m(30),
        height: getSize.m(30),
    },
    timerBoxTask: {
        fontSize: getSize.m(13),
        fontWeight: 'bold',
    },
    titleBoxTask: {
        fontSize: getSize.m(15),
        fontWeight: 'bold',
    },
    doneTaskText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    laterTaskText: {
        color: '#FF3B30',
        fontWeight: 'bold',
    },
    categoryBoxTask: {
        fontSize: getSize.m(15),
    },
    colorIcon: {
        height: getSize.m(25),
        width: getSize.m(25),
        marginLeft: getSize.m(10),
    }
});

export default styles;