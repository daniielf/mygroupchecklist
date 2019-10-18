import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginPage from './pages/login/login';
import GroupsPage from './pages/groups/groups';

const stack = createStackNavigator({
  Login: {
    screen: LoginPage,
    path: 'login/',
    navigationOptions: {
      header: null
    }
  },
  Groups: {
    screen: GroupsPage,
    path: 'groupslist/',
    navigationOptions: {
      title: 'My Groups',
      headerTintColor: '#FFF',
      headerStyle: { backgroundColor: '#D98740' },
      headerRight: (
        <TouchableOpacity onPress={GroupsPage.handleSubmitButtonPressd}>
          <Text style={{color: '#FFF', marginRight: 10}} >Menu</Text>
        </TouchableOpacity>
      )
    }
  }
}, {
  initialRouteName: 'Login'
});
const Routes = createAppContainer(stack);

export default Routes;