import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get("window")
const {height} = Dimensions.get("window")


const styles = StyleSheet.create({
    containerNoTaskScreen: {
        width: width,
        height: height*0.73,
        alignItems: 'center'
    },
    noTaskIcon: {
        height: 250,
        width: 250,
        resizeMode: 'contain',
        marginTop: 100,
    },
    textImage: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#5030A6',
        marginTop: 5
    },
    textNextTime: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBellow: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10
    }

})

export default styles;