import { StyleSheet, Dimensions} from "react-native";

const {width} = Dimensions.get("window")
const {height} = Dimensions.get("window")

const styles = StyleSheet.create({
    containerTabView: {
        width: width,
        height: height*0.78,
    },
    containerSubTabView: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    containerRenderContent: {
        height: height*0.725,
        marginTop: -4,
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
        marginTop: 19
    },
});

export default styles;
