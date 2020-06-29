import React, { useState } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Main = () => {

  const MenuPage = ({navigation}) => {
    return (
      <Menu navigation={navigation}/>
    );
  };

  const MenuNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="Menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#512DA8"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          }
        }}
      >
        <Stack.Screen name="Menu" component={MenuPage}/>
        <Stack.Screen name="Dishdetail" component={Dishdetail}/>
      </Stack.Navigator>
    )
  };

  return (
    <MenuNavigator/>
  )
};

export default Main;