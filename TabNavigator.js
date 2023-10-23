import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import BabyNames from './BabyNames';
import SummaryScreen from './SummaryScreen';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();//luodaan välilehtinavigaattori

const TabNavigator = () => {
  return (
    
    <Tab.Navigator
    //määritellään yleiset asetukset kaikille sivuille
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //määritellään routen mukaan ikonit 
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Names') {
            iconName = focused ? 'book' : 'book-outline';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
          //määritellään routen mukaan label tekstit
          if (route.name === 'Home') {
            label = 'Etusivu';
          } else if (route.name === 'Details') {
            label = 'Lisää';
          } else if (route.name === 'Summary') {
            label = 'Kehitys';
          } else if (route.name === 'Names') {
            label = 'Nimet';
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
      <Tab.Screen name="Names" component={BabyNames} />
    </Tab.Navigator>
  );
};

export default TabNavigator;



