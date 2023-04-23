import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BottomNavigation from './src/navigation/BottomNavigation';
import CreatePassword from './src/views/Auth/CreatePassword';
import ForgotPassword from './src/views/Auth/ForgotPassword';
import Login from './src/views/Auth/Login';

export default function App() {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            options={{headerShown: false}}
            component={BottomNavigation}
            name="BottomNavigation"
          />
          <RootStack.Screen
            options={{headerShown: false}}
            component={Login}
            name="Login"
          />
          <RootStack.Screen
            options={{headerShown: false}}
            component={CreatePassword}
            name="CreatePassword"
          />
          <RootStack.Screen
            options={{headerShown: false}}
            component={ForgotPassword}
            name="ForgotPassword"
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', position: 'relative'},
});
