import { StyleSheet } from 'react-native'
import { getSize } from '../../helpers/responsive'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: getSize.v(12),
        marginVertical: getSize.v(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'light',
        color: 'white',
        fontSize: getSize.m(14),
    },
})

export default styles