import React, { useEffect, useState } from 'react';
import { StyleSheet ,SafeAreaView, View, Text, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import firebase from '@react-native-firebase/app';

import { androidConfig } from '../../config/firebase.config';
import firestore from '@react-native-firebase/firestore';


export default function LoginPage({ navigation }) {
  const [usersCollection, setUserCollection] = useState(null);//firestore().collection('users');
  
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(androidConfig).then(() => {
        setUserCollection(firestore().collection('users'));
      }).catch((err) => console.log(err));
    } else {
      setUserCollection(firestore().collection('users'));
    }

    GoogleSignin.configure();
    // GoogleSignin.getCurrentUser().then((res) => {
    //   console.log('Get Current User', res);
    // }).catch( err => console.log('Get User Failed', err));
  }, []);

  function googleSignIn() {
    // navigation.navigate('Groups');
    GoogleSignin.hasPlayServices().then(() => {
      GoogleSignin.signIn().then((resp) => {
        GoogleSignin.getCurrentUser().then((res) => {
          const user = res.user;
          usersCollection.doc(user.email).get().then((doc) => {
            if (doc.exists) {
              navigation.navigate('Groups', { email: user.email });
            } else {
              usersCollection.doc(user.email).set({
                name: user.givenName
              }).then((newDoc) => {
                navigation.navigate('Groups', { email: user.email });
              });
            }
          }).catch(() => {
            usersCollection.doc(user.email).set({
              name: user.givenName
            }).then((newDoc) => {
              navigation.navigate('Groups', { email: user.email });
            });
          });
        }).catch( err => console.log('Get User Failed', err));
      }).catch( err => console.log('Auth Failed', err));
    }).catch(err => console.log('No Play Service', err));
  }

  return(
      <SafeAreaView style={styles.container}>
        <GoogleSigninButton
          style={styles.authButton}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn} />
          {/* <TouchableOpacity onPress={googleSignIn}>
            <Text>Sign IN</Text>
          </TouchableOpacity> */}
      </SafeAreaView>
  )
};