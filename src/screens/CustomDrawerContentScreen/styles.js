import { Dimensions, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const { height } = Dimensions.get("window")

const styles = StyleSheet.create({
    containerMenuScreen: {
      flex: 1,
      height: height,
      marginTop: getSize.s(-65)
    },
    containerProfile: {
      backgroundColor: '#7646FF',
      width: '100%',
      height: '25%',
      position: 'relative',
      justifyContent: 'center',
      paddingTop: getSize.s(35),
      alignItems: 'center'
    },
    containerAvatar: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    shadowBox: {
        width: 135,
        height: 130,
        borderRadius: 50,
        opacity: 0.35, 
        marginLeft: -17,
    },
    userAvatar: {
      height: getSize.s(100),
      width: getSize.s(100),
      borderWidth: 3,
      borderRadius: 50,
      borderColor: '#fff',
      position: 'absolute'
    },
    email: {
      alignContent: 'center',
      alignItems: 'center',
      fontSize: getSize.m(18),
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