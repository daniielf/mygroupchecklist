import React, { useState, useEffect } from 'react';
import { Alert,  Button, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import styles from './styles';
import DialogBox from '../../component/DialogBox';
import firestore from '@react-native-firebase/firestore';

export default function ChecklistPage({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState(navigation.getParam('group').name);
  const [group, setGroup] = useState(navigation.getParam('group'));
  const [userEmail, setuserEmail] = useState(navigation.getParam('userEmail'));
  const [changingTask, setChangingTask] = useState(null);
  const [isEditing, toggleEditing] = useState(false);
  const [isCreating, toggleCreating] = useState(false);
  const [groupCollection, setGroupCollection] = useState(firestore().collection('groups'));

  useEffect(() => {
    setTaskList( group.tasks ? group.tasks : []);
    groupCollection.doc(group.id).onSnapshot((snap) => {
      if (snap && snap.data()) {
        setTaskList(snap.data().tasks? snap.data().tasks : []);
      }
    })
  }, []);

  function startEdting(task) {
    setChangingTask(task);
    setTimeout(() => {
      toggleEditing(true);
    }, 300);
  }

  function copyGroupIdToClipboard() {
    Clipboard.setString(String(group.id));
    Alert.alert('ID saved', 'Group id saved into your clipboard!');
  }

  function setTaskNewValue(newValue) {
    let changeList = taskList;
    let getTask = changeList.find((task) => task.id === changingTask.id);
    getTask.name = newValue;
    setTaskList(changeList);
    setChangingTask(null);
    toggleEditing(false);
  }

  function confirmFinishTask(task) {
    Alert.alert('Finish task', 'Do you want to finish this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: () => { finishTask(task) }}
    ]);
  }

  function finishTask(task) {
    const newList = taskList.filter((elem) => elem.id !== task.id);
    let newGroup = group;
    newGroup.tasks = newList;
    updateGroup(group);
  }

  function updateGroup(groupToUpdate) {
    let groupRef = {};
    Object.assign(groupRef, groupToUpdate)
    delete groupRef['id'];
    groupCollection.doc(groupToUpdate.id).set(groupRef).then((doc) => {
      console.log('Doc Updt Sucess', doc);
    }).catch((err) => {
      console.log('Doc Update Err', err);
    });
    toggleCreating(false);
    setTaskList(group.tasks);
  }

  function addNewTask(taskName) {
    if (taskName === '') return
    const newTask = { id: group.id + Date.now(), name: taskName };
    group.tasks ? group.tasks.push(newTask) : group.tasks = [newTask];
    updateGroup(group);
  }

  function alertGroupLeaving() {
    Alert.alert( isUserAdm() ? 'Delete Group' : 'Leave Group', 'Are you sure you want to do this action?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: () => { leaveGroup() }}
    ]);
  }

  function leaveGroup() {
    if (isUserAdm()) {
      groupCollection.doc(group.id).delete().then(() => {
        navigation.pop();
      });
    } else {
      const groupUsersRef = group.users.filter((elem) => elem !== userEmail);
      let groupRef = group;
      groupRef.users = groupUsersRef;
      updateGroup(groupRef);
      navigation.pop();
    }
  }

  function isUserAdm() {
    return group.adm === userEmail;
  }

  return(
    <> 
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={copyGroupIdToClipboard}>
          <Text style={styles.backText}>ID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={alertGroupLeaving}>
          <Text style={styles.backText}>{ isUserAdm() ? "Delete" : "Leave"}</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <ScrollView>
          { taskList.length > 0 && taskList.map((task) => {
            return (
                <View style={styles.taskItem} key={task.id}>
                  <Text style={styles.taskItemText}>{task.name}</Text>
                  <TouchableOpacity style={styles.editButton} onPress={() => {startEdting(task)}}>
                    <Text style={styles.buttonText}>EDIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.finishButton} onPress={() => {confirmFinishTask(task)}}>
                    <Text style={styles.buttonText}>DONE</Text>
                  </TouchableOpacity>
                </View>
            )
          })}
          <View style={styles.blankBottomSpacing}></View>

        </ScrollView>
        <DialogBox
          isDialogVisible={isEditing}
          closeDialog={()=>{toggleEditing(false)}}
          initValueTextInput={changingTask ? changingTask.name : ''}
          submitInput={(inputText) => { setTaskNewValue(inputText) }}
          hintInput={changingTask ? changingTask.name : "Task Description..."}
          title={"Edit Task"}>
        </DialogBox>

        <DialogBox
          isDialogVisible={isCreating}
          closeDialog={()=>{toggleCreating(false)}}
          submitInput={(inputText) => { addNewTask(inputText) }}
          hintInput={"Task Description..."}
          title={"New Task"}>
        </DialogBox>
        
      </SafeAreaView>
      {/* <DialogBox></DialogBox> */}
      <View style={styles.floatButtonArea}>
        <TouchableOpacity style={styles.addItemButton} onPress={() => toggleCreating(true)}>
          <Text style={{ color: '#FFF'}}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  )
};
