import React, { useState, useEffect } from 'react';
import { Alert,  AlertButton,SafeAreaView, View, Text, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import styles from './styles';
import DialogInput from 'react-native-dialog-input';

export default function ChecklistPage({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState({});
  const [changingTask, setChangingTask] = useState(null);
  const [isEditing, toggleEditing] = useState(false);
  
  useEffect(() => {
    setTaskList([
      { name: 'Task 1', id: 1},
      { name: 'Task 2', id: 2},
      { name: 'Task 3', id: 3},
      { name: 'Task 4', id: 4},
      { name: 'Task 5', id: 5},
      { name: 'Task 6', id: 6},
      { name: 'Task 7', id: 7}
    ]);
    let currentGroup = navigation.getParam('group');
    if (currentGroup) {
      setGroup(currentGroup);
      setTitle(currentGroup.name);
    } else {
      navigation.pop();
    }
  }, []);

  function startEdting(task) {
    setChangingTask(task);
    toggleEditing(true);
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
        { taskList.length > 0 && taskList.map((task) => {
          return (
            <ScrollView>
              <View style={styles.taskItem}>
                <Text style={styles.taskItemText}>{task.name}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => {startEdting(task)}}>
                  <Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.finishButton} onPress={() => {confirmFinishTask(task)}}>
                  <Text style={styles.buttonText}>DONE</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )
        })}
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
