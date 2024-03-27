import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")

const styles = StyleSheet.create({
    containerMenuScreen: {
      flex: 1,
      width: width * 0.66,
      height: height,
      marginTop: -65
    },
    containerProfile: {
      backgroundColor: '#7646FF',
      width: '100%',
      height: '25%',
      position: 'relative',
      justifyContent: 'center',
      paddingTop: 35,
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
      height: 100,
      width: 100,
      borderWidth: 3,
      borderRadius: 50,
      borderColor: '#fff',
      position: 'absolute'
    },
    userName: {
      alignContent: 'center',
      alignItems: 'center',
      fontSize: 18,
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
        marginTop: 10,
        flexDirection: 'row',
        height: 30,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textButton: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 15,
        marginTop: 15,
        marginHorizontal: 10,
    }
  })
  
  export default styles;