import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../views/Profile/Profile';

const HomeStackNavigation = createStackNavigator();

export default function ProfileStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Profile}
        options={{headerShown: false}}
        name="Profile"
      />
    </HomeStackNavigation.Navigator>
  );
}
