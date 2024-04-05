import { Dimensions, StyleSheet } from "react-native";

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
        height: '25%',
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    headerBar: {
        flexDirection: 'row',
        marginTop: 55,
        justifyContent: 'flex-start',
    },
    backIcon: {
        width: 25,
        height: 25,
        marginLeft: 20,
        marginTop: 10
    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 145,
    },
    bellIcon: {
        width: 50,
        height: 50,
    },   
    plusIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    titleApp: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20, 
    },
    searchBar: {
        marginRight: 15,
        padding: 10, 
        paddingLeft: 15, 
        backgroundColor: '#fff', 
        borderRadius: 6, 
        width: '100%', 
        height: 45, 
        flexDirection: 'row',
    },
    searchIcon: {
        width: 25, 
        height: 25, 
        marginLeft: 10, 
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
    }
})

export default styles;