import { Dimensions, Platform, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const { height } = Dimensions.get("window")

const styles = StyleSheet.create({
    containerMenuScreen: {
      flex: 1,
      height: height,
      marginTop: Platform.OS === 'ios' ? getSize.s(-65) : getSize.s(-10)
    },
    containerProfile: {
      backgroundColor: '#7646FF',
      width: '100%',
      height: '30%',
      position: 'relative',
      justifyContent: 'center',
      paddingTop: getSize.s(35),
      alignItems: 'center',
    },
    containerAvatar: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    shadowBox: {
        width: getSize.s(135),
        height: getSize.s(130),
        borderRadius: getSize.s(50),
        opacity: 0.35, 
        marginLeft: getSize.s(-10),
        marginTop: getSize.s(10),
    },
    userAvatar: {
      height: getSize.s(120),
      width: getSize.s(120),
      borderWidth: getSize.s(4),
      borderRadius: getSize.s(60),
      borderColor: '#fff',
      position: 'absolute'
    },
    infoContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    displayName: {
      fontSize: getSize.m(20),
      color: '#fff',
      fontWeight: 'bold',
    },
    email: {
      fontSize: getSize.m(14),
      color: '#fff',
    },
    containerMenuBar: {
        width: '100%',
        height: '75%',
        backgroundColor: '#fff',
    },
    menuBar: {
        borderColor: 'lightgray',
    },
    customButton: {
        marginTop: getSize.s(10),
        flexDirection: 'row',
        height: getSize.s(30),
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textButton: {
        fontSize: getSize.m(18),
        marginTop: getSize.s(10),
        marginLeft: getSize.s(10),
    },
    icon: {
        width: getSize.s(35),
        height: getSize.s(35),
        marginLeft: getSize.s(15),
        marginTop: getSize.s(15),
        marginHorizontal: getSize.s(10),
    }
  })
  
  export default styles;