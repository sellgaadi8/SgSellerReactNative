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
import VehicleDetail from './src/views/Vehicles/VehicleDetail';
import {useAppSelector} from './src/utils/hooks';
import Snackbar from 'react-native-snackbar';
import ImageViewerCarousel from './src/views/ImageViewCarousel/ImageViewCarousel';
import {deleteUserToken, saveVehicleType} from './src/utils/localStorage';
import HandlingSuspension from './src/views/Vehicles/HandlingSuspension';
import TwoWheelerExterior from './src/views/Vehicles/TwoWheelerExterior';
import TwoWheelerElectrical from './src/views/Vehicles/TwoWheelerElectrical';
import VideoPlayer from './src/components/VideoPlayer';
import Register from './src/views/Auth/Register';
import ImageSection from './src/views/Vehicles/ImageSection';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {navigationRef} from './src/navigation/navigate';

export default function App() {
  const RootStack = createStackNavigator<RootStackParamList>();
  const [authenticated, setAuthenticated] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const [name, setName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const selectLogoutState = useAppSelector(state => state.logout);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        const {click_to_action} = notification.data;
        const clickToActionString = click_to_action;
        const clickToAction = JSON.parse(clickToActionString);

        if (notification.foreground) {
          // Handle notification when app is in foreground
        } else {
          if (clickToAction) {
            let route: keyof RootStackParamList = 'HomeStack';
            let params: any = {};

            switch (clickToAction.page) {
              case 'details_page':
                route = 'VehicleDetail';
                params.uuid = clickToAction.id;
                setVehicleId(clickToAction.id);
                break;
            }
            navigationRef.current?.navigate(route, {
              from: 'NOTIFICATIONS',
              ...params,
            });
          }
        }
        PushNotification.removeAllDeliveredNotifications();
      },
      popInitialNotification: true,
    });
  }, []);

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
      } else {
        deleteUserToken();
        setAuthenticated(false);
        saveVehicleType('');
      }
    }
  }, [selectLogoutState]);

  const getFirebaseToken = async () => {
    const token = await messaging().getToken();
    console.log('token=>>>>>', token);
  };

  useEffect(() => {
    getFirebaseToken();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        setAuthenticated,
        name,
        setName,
        vehicleId,
        setVehicleId,
        vehicleType,
        setVehicleType,
      }}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <NavigationContainer ref={navigationRef}>
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
                  component={Register}
                  name="Register"
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
                  options={(param: {
                    route: RouteProp<any, any>;
                    navigation: any;
                  }) => {
                    return {
                      header: props => (
                        <Header
                          title={param.route.params?.title}
                          headerProps={props}
                          back
                        />
                      ),
                    };
                  }}
                  component={AddVehicle}
                  name="AddVehicle"
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
                  component={DisplayInfo}
                  name="DisplayInfo"
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
                  component={CarImages}
                  name="CarImages"
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
                  component={CarDocuments}
                  name="CarDocuments"
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
                  component={Exterior}
                  name="Exterior"
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
                  component={TwoWheelerExterior}
                  name="TwoWheelerExterior"
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
                  component={ExternelPanel}
                  name="ExternelPanel"
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
                  component={HandlingSuspension}
                  name="HandlingSuspension"
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
                  component={Tyres}
                  name="Tyres"
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
                  component={Engine}
                  name="Engine"
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
                  component={Electricals}
                  name="Electricals"
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
                  component={TwoWheelerElectrical}
                  name="TwoWheelerElectrical"
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
                <RootStack.Screen
                  options={() => {
                    return {
                      header: props => (
                        <Header headerProps={props} title="Images" back />
                      ),
                    };
                  }}
                  component={VideoPlayer}
                  name="VideoPlayer"
                />
                <RootStack.Screen
                  options={{headerShown: false}}
                  component={ImageSection}
                  name="ImageSection"
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
