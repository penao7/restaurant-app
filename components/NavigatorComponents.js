import React from 'react';
import Login from './LoginComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favourites from './FavouriteComponent';
import {
  View,
  TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const MenuNavigator = () => {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "#fff",
          }
        })}
      >
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity style={{ margin: 10 }}>
                <Icon
                  name="menu"
                  size={30}
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
            )
          })}
        />
      </Stack.Navigator>
    </View>
  )
};

export const ContactNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "#fff"
          },
          headerLeft: () => (
            <TouchableOpacity style={{ margin: 10 }}>
              <Icon
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
          )
        }
        )
        }
      >
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </View>
  )
};

export const AboutUsNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "#fff"
          },
          headerLeft: () => (
            <TouchableOpacity style={{ margin: 10 }}>
              <Icon
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
          ),
        }
        )
        }
      >
        <Stack.Screen name="About Us" component={About} />
      </Stack.Navigator>
    </View>
  )
};

export const ReservationNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={() => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "#fff",
          }
        })
        }
      >
        <Stack.Screen
          name="Reserve a table"
          component={Reservation}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity style={{ margin: 10 }}>
                <Icon
                  name="menu"
                  size={30}
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
            )
          })}
        />
      </Stack.Navigator>
    </View>
  );
};


export const FavouritesNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "#fff"
          },
          headerLeft: () => (
            <TouchableOpacity style={{ margin: 10 }}>
              <Icon
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
          ),
        }
        )
        }
      >
        <Stack.Screen name="Favourites" component={Favourites} />
      </Stack.Navigator>
    </View>
  )
};

export const LoginNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ margin: 10 }}>
              <Icon
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
          ),
        }
        )
        }
      >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </View>
  )
};

export const HomeNavigator = () => {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity style={{ margin: 10 }}>
              <Icon
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
          ),
        }
        )
        }
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </View>
  )
};