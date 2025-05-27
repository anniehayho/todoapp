import { StyleSheet, Dimensions} from "react-native";
import { getSize } from "../../helpers/responsive";
const {width} = Dimensions.get("window")
const {height} = Dimensions.get("window")

const styles = StyleSheet.create({
    containerTabView: {
        width: width,
        height: height*0.78,
        backgroundColor: '#7646FF', // Purple background color
    },
    containerSubTabView: {
        height: getSize.m(60),
        flexDirection: 'row',
        paddingTop: getSize.m(10),
        backgroundColor: '#7646FF',
        paddingHorizontal: getSize.m(16),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    containerRenderContent: {
        height: height*0.725,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    titleTabView: {
        fontSize: getSize.m(13),
        color: '#fff',
        fontWeight: '500',
        opacity: 0.8,
    },
    titleTabViewActive: {
        fontSize: getSize.m(14),
        color: '#fff',
        fontWeight: '700',
        opacity: 1,
    },
    lineTabView: {
        width: '50%',
        height: getSize.s(3),
        backgroundColor: '#fff',
        marginTop: getSize.v(8),
        borderRadius: 2,
    },
});

export default styles;
