import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7646FF',
        paddingVertical: getSize.m(35),
        paddingHorizontal: getSize.m(16),
    },
    backButton: {
        marginRight: getSize.m(16),
        paddingTop: getSize.m(50),
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    headerTitle: {
        fontSize: getSize.m(24),
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        marginRight: getSize.m(40),
        paddingTop: getSize.m(50),
    },
    container: {
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    rowWithValue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginHorizontal: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 16,
        tintColor: '#7646FF',
    },
    text: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    valueText: {
        fontSize: 16,
        color: '#A0A0A0',
        fontWeight: '400',
    },
});

export default styles;