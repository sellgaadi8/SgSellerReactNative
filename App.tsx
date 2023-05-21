/* eslint-disable react/no-unstable-nested-components */
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Header from './src/components/Header';
import GlobalContext from './src/contexts/GlobalContext';
import BottomNavigation from './src/navigation/BottomNavigation';
import colors from './src/utils/colors';
import CreatePassword from './src/views/Auth/CreatePassword';
import ForgotPassword from './src/views/Auth/ForgotPassword';
import Login from './src/views/Auth/Login';
import ProfileDetails from './src/views/Profile/ProfileDetails';
import Splash from './src/views/Splash/Splash';
import ValuatorForm from './src/views/Valuators/ValuatorForm';
import AddVehicle from './src/views/Vehicles/AddVehicle';
import CarDocuments from './src/views/Vehicles/CarDocuments';
import DisplayInfo from './src/views/Vehicles/DisplayInfo';
import Exterior from './src/views/Vehicles/Exterior';

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
            {!authenticated ? (
              <>
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={Splash}
                  name="Splash"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={Login}
                  name="Login"
                />

                <RootStack.Screen
                  options={{headerShown: false}}
                  component={ForgotPassword}
                  name="ForgotPassword"
                />
              </>
            ) : (
              <>
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={BottomNavigation}
                  name="BottomNavigation"
                />
                <RootStack.Screen
                  options={(param: {
                    route: RouteProp<any, any>;
                    navigation: any;
                  }) => {
                    return {
                      header: props => (
                        <Header
                          headerProps={props}
                          title={param.route.params?.title}
                          back
                        />
                      ),
                    };
                  }}
                  component={ProfileDetails}
                  name="ProfileDetails"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={CreatePassword}
                  name="CreatePassword"
                />
                <RootStack.Screen
                  options={(param: {
                    route: RouteProp<any, any>;
                    navigation: any;
                  }) => {
                    return {
                      header: props => (
                        <Header
                          headerProps={props}
                          title={param.route.params?.title}
                          back
                        />
                      ),
                    };
                  }}
                  component={ValuatorForm}
                  name="ValuatorForm"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header
                          headerProps={props}
                          title="Add new vehicle"
                          back
                        />
                      ),
                    };
                  }}
                  component={AddVehicle}
                  name="AddVehicle"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header
                          headerProps={props}
                          title="Add new vehicle"
                          back
                        />
                      ),
                    };
                  }}
                  component={DisplayInfo}
                  name="DisplayInfo"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header
                          headerProps={props}
                          title="Add new vehicle"
                          back
                        />
                      ),
                    };
                  }}
                  component={CarDocuments}
                  name="CarDocuments"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header
                          headerProps={props}
                          title="Add new vehicle"
                          back
                        />
                      ),
                    };
                  }}
                  component={Exterior}
                  name="Exterior"
                />
              </>
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
