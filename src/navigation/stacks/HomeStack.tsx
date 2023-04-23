import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../views/Home/Home';

const HomeStackNavigation = createStackNavigator();

export default function HomeStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Home}
        options={() => {
          return {
            headerShown: false,
          };
        }}
        name="Home"
      />
    </HomeStackNavigation.Navigator>
  );
}
