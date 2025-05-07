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
        fontSize: getSize.s(15),
    },
    titleBoxTask: {
        fontSize: getSize.s(15),
    },
    categoryBoxTask: {
        fontSize: getSize.s(15),
    },
    colorIcon: {
        height: getSize.s(25),
        width: getSize.s(25),
        marginLeft: 15
    }
});

export default styles;