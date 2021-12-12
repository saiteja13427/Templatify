/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Node} from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DesignScreen from './screens/DesignScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6E3CBC',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Design" component={DesignScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default App;

//#6E3CBC
//#7267CB
//#98BAE7
//#B8E4F0
