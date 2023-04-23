import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Vehicles from '../../views/Vehicles/Vehicles';

const HomeStackNavigation = createStackNavigator();

export default function VehicleStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Vehicles}
        options={{headerShown: false}}
        name="Vehicles"
      />
    </HomeStackNavigation.Navigator>
  );
}
