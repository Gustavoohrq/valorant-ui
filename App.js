import React from 'react';
import { StatusBar } from "react-native";

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from "./src/screens/Home";
import Loading from "./src/screens/Loading";

const AppStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar barStyle="light-content" />
      <AppStack.Navigator mode="modal" headerMode="none">
        <AppStack.Screen name="Loading" component={Loading} />
        <AppStack.Screen name="HomeScreen" component={HomeScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}