import { StyleSheet, Dimensions } from "react-native";

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
    },
    containerLeftBoxTask: {
        width: '12%',
        marginLeft: 20,
        justifyContent: 'center'
    },
    containerCenterBoxTask: {
        width: '60%',
        marginLeft: 10
    },
    containerRightBoxTask: {
        width: '25%',
    },
    containerRightIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 20,
        alignItems: 'center' 
    },
    starIconBoxTask: {
        width: 30,
        height: 30,
    },
    timerBoxTask: {
        fontSize: 18,
    },
    titleBoxTask: {
        fontSize: 20,
    },
    categoryBoxTask: {
        fontSize: 14,
    },
    colorIcon: {
        height: 28,
        width: 28,
        marginLeft: 15
    }
});

export default styles;