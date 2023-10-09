import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      title:'BabySteps',
      headerStyle: {
        backgroundColor: '#FFB6C1',
      },
      headerTintColor: '#fff', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:28,
        alignItems:'center'}}}>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;


