import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import NewTask from '../../screens/NewTaskScreen'
import ImportantTask from '../../screens/ImportantTaskScreen'
import DoneTask from '../../screens/DoneTaskScreen'
import LaterTask from '../../screens/LaterTaskScreen'
import Category from '../../screens/CategoryScreen'
import Setting from '../../screens/SettingScreen'
import Logout from '../../screens/LoginScreen'


const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  // return (
    // <Drawer.Navigator>
    //   <Drawer.Screen name="NewTask" component={NewTask} />
    //   <Drawer.Screen name="Important" component={ImportantTask} />
    //   <Drawer.Screen name="Done" component={DoneTask} />
    //   <Drawer.Screen name="Later" component={LaterTask} />
    //   <Drawer.Screen name="Category" component={Category} />
    //   <Drawer.Screen name="Setting" component={Setting} />
    //   <Drawer.Screen name="Logout" component={Logout} />
    // </Drawer.Navigator>


  // )
}

export default DrawerMenu