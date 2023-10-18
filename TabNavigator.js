import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';
import SummaryScreen from './SummaryScreen';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
      
          if (route.name === 'Home') {
            label = 'Etusivu';
          } else if (route.name === 'Details') {
            label = 'Lisää';
          } else if (route.name === 'Summary') {
            label = 'Kehitys';
          } else if (route.name === 'Settings') {
            label = 'Settings';
          }
      
          
          return <Text style={{ color }}>{label}</Text>;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        title: 'BabySteps',
        headerStyle: {
          backgroundColor: '#FFB6C1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 26,
          textShadowColor: 'rgba(0,0,0,0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
          alignItems: 'center',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;



