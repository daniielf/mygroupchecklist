import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DialogInput from 'react-native-dialog-input';

import styles from './styles';

 function GroupsPage({navigation}) {
  const [alertDialogOpen, toggleAlertDialog] = useState(false);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
  }, []);

  function handleNewGroupButtonPressed() {
    toggleAlertDialog(true);
  }

  function insertNewGroup(group) {
    let newGroupList = groupList;
    newGroupList.push(group);
    setGroupList(newGroupList);
    toggleAlertDialog(false);
  }

  return(
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>My Groups</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleNewGroupButtonPressed()}>
          <Text style={styles.backText}>Menu</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        { groupList.length === 0 ? 
        <View style={styles.noResultView}>
          <Text>You have no groups...</Text>
        </View>
        :
        <ScrollView style={styles.scrollListView}>
          { groupList.map((group, index) => { 
              return (<View key={index} style={styles.groupListItem}>
                        <Text style={styles.groupItemText}>{group}</Text>
                      </View>)
            }) 
          }
        </ScrollView>
      }
        <DialogInput
          isDialogVisible={alertDialogOpen}
          onChangeText={(inputModal) => { console.log('Value Changed', inputModal) }}
          closeDialog={()=>{toggleAlertDialog(false)}}
          submitInput={(inputText) => {insertNewGroup(inputText)} }
          hintInput={"Group name..."}
          title={"New Group"}>
        </DialogInput>
      </SafeAreaView>
    </>
  )
};

export default GroupsPage;
