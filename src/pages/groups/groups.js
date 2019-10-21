import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Modal,TouchableOpacity, ScrollView } from 'react-native';
import DialogInput from 'react-native-dialog-input';

import styles from './styles';

 function GroupsPage({navigation}) {
  const [newGroupDialog, toggleNewGroupDialog] = useState(false);
  const [joinGroupDialog, toggleJoinGroupDialog] = useState(false);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
  }, []);

  function handleNewGroupButtonPressed() {
    toggleNewGroupDialog(true);
  }

  function insertNewGroup(group) {
    let newGroupList = groupList;
    newGroupList.push({name: group, id: groupList.length });
    setGroupList(newGroupList);
    toggleNewGroupDialog(false);
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
        <TouchableOpacity style={styles.menuButton} onPress={() => toggleNewGroupDialog(true)}>
          <Text style={styles.backText}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => toggleJoinGroupDialog(true)}>
          <Text style={styles.backText}>Join</Text>
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
                return (<TouchableOpacity onPress={() => navigation.navigate('Checklist', { group })} key={index} style={styles.groupListItem}>
                          <Text style={styles.groupItemText}>{group.name}</Text>
                        </TouchableOpacity>)
              }) 
            }
          </ScrollView>
        }
        <DialogInput
          isDialogVisible={newGroupDialog}
          closeDialog={()=>{toggleNewGroupDialog(false)}}
          submitInput={(inputText) => {insertNewGroup(inputText)} }
          hintInput={"Group name..."}
          title={"New Group"}>
        </DialogInput>

        <DialogInput
          isDialogVisible={joinGroupDialog}
          closeDialog={()=>{toggleJoinGroupDialog(false)}}
          submitInput={(inputText) => { toggleJoinGroupDialog(false); console.log('JOIN', inputText)} }
          hintInput={"Group ID"}
          title={"Join Group"}>
        </DialogInput>
      </SafeAreaView>
    </>
  )
};

export default GroupsPage;