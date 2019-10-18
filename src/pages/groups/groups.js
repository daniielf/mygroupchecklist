import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';

import Styles  from './styles';

export default function GroupsPage() {
  const [alertDialogOpen, toggleAlertDialog] = useState(false);

  function handleNewGroupButtonPressed() {
    toggleAlertDialog(true);
  }

  return(
    <SafeAreaView style={Styles.container}>
      <Text>No groups...</Text>
      <DialogInput
        isDialogVisible={alertDialogOpen}
        closeDialog={()=>{toggleAlertDialog(false)}}
        hintInput={"Group name..."}
        title={"New Group"}></DialogInput>
    </SafeAreaView>
  )
};
