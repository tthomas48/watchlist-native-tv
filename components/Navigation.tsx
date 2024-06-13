import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/app/index';
import LoginScreen from '@/app/login';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer independent={true}>
    <HomeNavigator/>
  </NavigationContainer>
);