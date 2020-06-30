import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Main = () => {

  const HomeNavigator = () => {
    return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
        <Stack.Navigator initialRouteName="Home"
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
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </View>
    )
  };

  const MenuNavigator = () => {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
        <Stack.Navigator initialRouteName="Menu"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff'
            },

          }}
        >
          <Stack.Screen name="Menu" component={Menu}/>
          <Stack.Screen name="Dishdetail" component={Dishdetail}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </View>
    )
  };

  const MainNavigator = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={{
          style: {
            backgroundColor: '#D1C4E9'
          }
        }}
      >
        <Drawer.Screen name="Home" component={HomeNavigator}/>
        <Drawer.Screen name ="Menu" component={MenuNavigator}/>
      </Drawer.Navigator>
    );
  };


  return (
    <MainNavigator/>
  )
};

export default Main;