import { StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '90%',
      paddingHorizontal: getSize.s(8),
      alignItems: 'center',
      minHeight: getSize.v(50),
    },
    inputText: {
      flex: 1,
      borderRadius: getSize.m(5),
      fontSize: getSize.m(14),
      paddingVertical: getSize.v(8),
      paddingHorizontal: getSize.s(5),
    },
    icon: {
      width: getSize.s(22),
      height: getSize.s(22),
      marginRight: getSize.s(5),
    },
});

export default styles