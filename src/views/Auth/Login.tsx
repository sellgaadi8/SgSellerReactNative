import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
// import {useEffect} from 'react';
// import {LoginProps} from '../../types/propsTypes';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});
