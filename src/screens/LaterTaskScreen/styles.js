import { Dimensions, StyleSheet } from "react-native";
import { getSize } from "../../helpers/responsive";

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")


const styles = StyleSheet.create({
    containerTaskDetailsScreen: {
        width: width,
        height: height,
        backgroundColor: '#EFEFEF',
    },
    headerTaskDetailsScreen: {
        backgroundColor: '#7646FF',
        display: 'flex',
        height: '20%',
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    headerBar: {
        flexDirection: 'row',
        marginTop: 55,
        justifyContent: 'flex-start',
    },
    backIcon: {
        width: getSize.s(20),
        height: getSize.s(20),
        marginTop: getSize.s(20),
        marginLeft: getSize.s(20)
    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 145,
    },
    bellIcon: {
        width: getSize.s(40),
        height: getSize.s(40),
        marginTop: getSize.s(10),
    },   
    plusIcon: {
        width: getSize.s(25),
        height: getSize.s(25),
        marginTop: getSize.s(10),
        marginLeft: getSize.s(10),
    },
    titleApp: {
        color: '#fff',
        fontSize: getSize.m(20),
        marginTop: getSize.s(18),
        marginLeft: getSize.s(18), 
    },
    searchBar: {
        marginTop: getSize.s(-10),
        padding: 10, 
        paddingLeft: getSize.s(15), 
        backgroundColor: '#fff', 
        borderRadius: 6, 
        height: getSize.s(40), 
        flexDirection: 'row',
    },
    searchInput: {
        width: '90%',
        height: '100%',
        paddingLeft: getSize.s(10),
    },
    searchIcon: {
        width: getSize.s(25), 
        height: getSize.s(25), 
        marginRight: getSize.s(5), 
        alignItems: 'baseline'
    },
    containerInformationTaskBox: {
        width: width*0.9,
        backgroundColor: '#fff', 
        marginHorizontal: 23,
        marginTop: -30,
        alignSelf: 'flex-start',
        paddingBottom: 30,
    },
    titleTask: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 30,
        marginLeft: 20,
    },
    datetimeTask: {
        marginLeft: 20,
        marginTop: 10,
    },
    descriptionTask: {
        marginHorizontal: 20,
        marginTop: 15,
    },
    categoryTask: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    categoryTitle: {
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 15,
    }, 
    containerTaskDetailsNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 40,
        height: 60,
    },
    iconBarNavigation: {
        height: 30,
        width: 30,
    },
    containerDoneTaskList: {
        width: width,
        height: '80%'
    },
    showDoneTaskList: {
        backgroundColor: '#fff',
        marginTop: 20,
    },
    dateHeader: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      textHeader: {
        fontSize: 12,
        backgroundColor: '#F54439',
        color: '#fff',
        paddingHorizontal: 10,
        height: 20,
        paddingTop: 3,
      },
    }
)
export default styles