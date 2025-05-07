import { View, Text } from 'react-native'
import React from 'react'

const ImportantTaskScreen = () => {
  return (
    <View style={styles.containerTaskDetailsScreen}>
      <View style={styles.headerTaskDetailsScreen}>

        <StatusBar barStyle={'light-content'} />

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPressed}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.titleApp}>
            <Text>Important Task</Text>
          </Text>

          <View style={styles.containerIcon}>
            <TouchableOpacity>
              <Image source={bellIcon} style={styles.bellIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToNewTaskScreen}>
              <Image source={plusIcon} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <View style={styles.searchBar}>
            <TextInput style={styles.searchInput} placeholder='Search Task'/>
            <TouchableOpacity>
              <Image source={searchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.containerDoneTaskList}>
        <FlatList 
          data={sortedDates.map(date => [date, groupedTasks[date]])}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={styles.showDoneTaskList}>
              <View style={styles.dateHeader}> 
                <Text style={styles.textHeader} >{formatDate(item[0])}</Text>
              </View>
              <FlatList
                style={styles.importantTaskList}
                data={item[1]}
                keyExtractor={(task) => task.id.toString()}
                renderItem={renderItem}
              >
              </FlatList>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default ImportantTaskScreen