import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { View, StatusBar } from 'react-native';
import { initializeApp } from "firebase/app";


export default function App() {
  useEffect(() => {
    // Firebase konfiguraatio
    const firebaseConfig = {
      apiKey: "AIzaSyBIpEFq1yTUX2LpOhlSdj6iL3MXpXvyO4c",
    authDomain: "babysteps-a2b0d.firebaseapp.com",
    projectId: "babysteps-a2b0d",
    storageBucket: "babysteps-a2b0d.appspot.com",
    messagingSenderId: "860501091229",
    appId: "1:860501091229:web:0a7f7c205b55acff900574"
    };
    
    initializeApp(firebaseConfig);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar/>
      <TabNavigator /> 
    </NavigationContainer>
  );
}



