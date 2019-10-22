import React, { useState, useEffect } from 'react';
import { Alert,  Button, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import styles from './styles';
import DialogInput from 'react-native-dialog-input';
import firestore from '@react-native-firebase/firestore';

export default function ChecklistPage({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState(navigation.getParam('group').name);
  const [group, setGroup] = useState(navigation.getParam('group'));
  const [changingTask, setChangingTask] = useState(null);
  const [isEditing, toggleEditing] = useState(false);
  const [groupCollection, setGroupCollection] = useState(firestore().collection('groups'));

  useEffect(() => {
    console.log('Nav Group', navigation.getParam('group'));
    setTaskList( group.tasks ? group.tasks : []);
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
      { text: 'Confirm', style: 'destructive', onPress: () => {finishTask(task)}}
    ]);
  }

  function finishTask(task) {
    setTaskList(taskList.filter((elem) => elem.id !== task.id));
  }

  function addNewTask(taskName) {
    const newTask = { id: group.id + Date.now(), name: taskName };
    group.tasks ? group.tasks.push(newTask) : group.tasks = [newTask];
    let groupRef = {};
    Object.assign(groupRef, group)
    delete groupRef['id'];
    console.log('GRUPO THEN', groupRef);
    groupCollection.doc(group.id).set(groupRef).then((doc) => {
      console.log('Doc Updt Sucess', doc);
    }).catch((err) => {
      console.log('Doc Update Err', err);
    });
    setTaskList(group.tasks);
  }

  return(
    <> 
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={() => {copyGroupIdToClipboard()}}>
          <Text style={styles.backText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => {return}}>
          <Text style={styles.backText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <Button title="add" onPress={() => {
          addNewTask('MyNewTask');
        }}></Button>
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
        </ScrollView>
        <DialogInput
          isDialogVisible={isEditing}
          closeDialog={()=>{toggleEditing(false)}}
          submitInput={(inputText) => { setTaskNewValue(inputText) }}
          hintInput={"Task Description..."}
          title={"Edit Task"}>
        </DialogInput>
      </SafeAreaView>
    </>
  )
};
