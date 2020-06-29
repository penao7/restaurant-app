import React from 'react';
import Main from './components/MainComponent'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';


export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

