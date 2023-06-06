import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import Settings from '../screens/Settings';
import ManuallyConnect from '../screens/ManuallyConnect';
import Connect from '../screens/Connect';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Manually Connect" component={ManuallyConnect} />
        <Stack.Screen name="Connect" component={Connect}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}