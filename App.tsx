import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import GlobalContext from './src/contexts/GlobalContext';
import BottomNavigation from './src/navigation/BottomNavigation';
import colors from './src/utils/colors';
import CreatePassword from './src/views/Auth/CreatePassword';
import ForgotPassword from './src/views/Auth/ForgotPassword';
import Login from './src/views/Auth/Login';

export default function App() {
  const RootStack = createStackNavigator<RootStackParamList>();
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');

  return (
    <GlobalContext.Provider value={{setAuthenticated, name, setName}}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <NavigationContainer>
          <RootStack.Navigator>
            {authenticated ? (
              <>
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
              </>
            ) : (
              <RootStack.Screen
                options={{headerShown: false}}
                component={BottomNavigation}
                name="BottomNavigation"
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', position: 'relative'},
});
