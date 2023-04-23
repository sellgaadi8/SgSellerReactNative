import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Valuator from '../../views/Valuators/Valuator';

const HomeStackNavigation = createStackNavigator();

export default function ValuatorStack() {
  return (
    <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
        component={Valuator}
        options={{headerShown: false}}
        name="Valuator"
      />
    </HomeStackNavigation.Navigator>
  );
}
