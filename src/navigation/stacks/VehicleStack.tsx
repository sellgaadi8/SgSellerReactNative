/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Vehicles from '../../views/Vehicles/Vehicles';
import Header from '../../components/Header';

const HomeStackNavigation = createStackNavigator();

export default function VehicleStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Vehicles}
        options={() => {
          return {
            header: props => (
              <Header headerProps={props} title="List of vehicles" />
            ),
          };
        }}
        name="Vehicles"
      />
    </HomeStackNavigation.Navigator>
  );
}
