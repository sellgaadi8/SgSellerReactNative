import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../views/Profile/Profile';
import Header from '../../components/Header';

const HomeStackNavigation = createStackNavigator();

export default function ProfileStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Profile}
        options={() => {
          return {
            header: props => <Header title="Profile" />,
          };
        }}
        name="Profile"
      />
    </HomeStackNavigation.Navigator>
  );
}
