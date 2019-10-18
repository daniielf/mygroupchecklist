import React, { useEffect } from 'react';
import { StyleSheet ,SafeAreaView, View, Text, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

export default function LoginPage({ navigation }) {
  useEffect(() => {
    GoogleSignin.configure();

    GoogleSignin.getCurrentUser().then((res) => {
      // console.log(res);
    }).catch( err => console.log(err));
  }, []);

  function googleSignIn() {
    navigation.navigate('Groups');
    // GoogleSignin.hasPlayServices().then(() => {
    //   GoogleSignin.signIn((resp) => {
    //     console.log('SignIn Success');
    //     GoogleSignin.getCurrentUser().then((res) => {
    //       console.log('Current User:', res.email);
    //       // navigation.navigate('Groups');
    //       console.log(res);
    //     }).catch( err => console.log('Get User Failed', err));
    //   }).catch( err => console.log('Auth Failed', err));
    // }).catch((err) => {
    //   console.log('No Play Service', err);
    // });
  }

  return(
      <SafeAreaView style={styles.container}>
        <GoogleSigninButton
          style={styles.authButton}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn} />
      </SafeAreaView>
  )
};