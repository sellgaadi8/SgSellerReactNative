import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import colors from '../../utils/colors';

export default function Home() {
  const {name} = useContext(GlobalContext);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          color: colors.primary,
          fontFamily: 'Roboto-Medium',
        }}>
        Welcome {name}
      </Text>
    </View>
  );
}
