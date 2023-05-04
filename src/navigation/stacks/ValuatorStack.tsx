/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Valuator from '../../views/Valuators/Valuator';
import Header from '../../components/Header';

const HomeStackNavigation = createStackNavigator();

export default function ValuatorStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Valuator}
        options={() => {
          return {
            header: props => (
              <Header title="List of valuators" headerProps={props} />
            ),
          };
        }}
        name="Valuator"
      />
    </HomeStackNavigation.Navigator>
  );
}
