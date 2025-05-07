import { StyleSheet, Dimensions} from "react-native";
import { getSize } from "../../helpers/responsive";
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
        paddingTop: 10
    },
    containerRenderContent: {
        height: height*0.725,
        marginTop: -4,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        marginVertical: getSize.v(10),
    },
    titleTabView: {
        fontSize: getSize.m(18),
        color: '#fff',
        marginHorizontal: getSize.v(20)
    },
    lineTabView: {
        width: '100%',
        height: getSize.s(3),
        backgroundColor: 'yellow',
        marginTop: getSize.v(15)
    },
});

export default styles;
