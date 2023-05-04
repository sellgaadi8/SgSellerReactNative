import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../views/Home/Home';
import Header from '../../components/Header';

const HomeStackNavigation = createStackNavigator();

export default function HomeStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Home}
        options={() => {
          return {
            // eslint-disable-next-line react/no-unstable-nested-components
            header: props => <Header headerProps={props} showIcon />,
          };
        }}
        name="Home"
      />
    </HomeStackNavigation.Navigator>
  );
}
