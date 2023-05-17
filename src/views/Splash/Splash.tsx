import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {getUserToken} from '../../utils/localStorage';
import GlobalContext from '../../contexts/GlobalContext';
import {SplashProps} from '../../types/propsTypes';

export default function Splash({navigation}: SplashProps) {
  const {setAuthenticated} = useContext(GlobalContext);

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Login');
  //   }, 1000);
  // }, []);

  async function getToken() {
    const token = await getUserToken();
    console.log('====>', token);
    if (token) {
      setAuthenticated(true);
    } else {
      navigation.navigate('Login');
    }
  }
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}
