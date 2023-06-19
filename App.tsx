/* eslint-disable react/no-unstable-nested-components */
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
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
import ExternelPanel from './src/views/Vehicles/ExternelPanel';
import CarImages from './src/views/Vehicles/CarImages';
import Tyres from './src/views/Vehicles/Tyres';
import Engine from './src/views/Vehicles/Engine';
import Electricals from './src/views/Vehicles/Electricals';
import Steering from './src/views/Vehicles/Steering';
import Ac from './src/views/Vehicles/Ac';
import VehicleDetail from './src/views/Vehicles/VehicleDetail';
import {useAppSelector} from './src/utils/hooks';
import Snackbar from 'react-native-snackbar';
import ImageViewerCarousel from './src/views/ImageViewCarousel/ImageViewCarousel';

export default function App() {
  const RootStack = createStackNavigator<RootStackParamList>();
  const [authenticated, setAuthenticated] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const [name, setName] = useState('');
  const selectLogoutState = useAppSelector(state => state.logout);

  useEffect(() => {
    if (selectLogoutState.called) {
      const {error, message} = selectLogoutState;
      if (!error && message) {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
        setAuthenticated(false);
        setVehicleId('');
      }
    }
  }, [selectLogoutState]);

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
        name,
        setName,
        vehicleId,
        setVehicleId,
      }}>
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
                  options={(param: {route: RouteProp<any, any>}) => {
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
                  component={VehicleDetail}
                  name="VehicleDetail"
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
                  component={CarImages}
                  name="CarImages"
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
                  component={ExternelPanel}
                  name="ExternelPanel"
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
                  component={Tyres}
                  name="Tyres"
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
                  component={Engine}
                  name="Engine"
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
                  component={Electricals}
                  name="Electricals"
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
                  component={Steering}
                  name="Steering"
                />
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header headerProps={props} title="Images" back />
                      ),
                    };
                  }}
                  component={ImageViewerCarousel}
                  name="ImageViewerCarousel"
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
