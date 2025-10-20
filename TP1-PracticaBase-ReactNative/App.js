import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounterScreen from './src/screens/CounterScreen';
import TodoScreen from './src/screens/TodoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Counter">
        <Tab.Screen name="Counter" component={CounterScreen} />
        <Tab.Screen name="To-Do" component={TodoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

