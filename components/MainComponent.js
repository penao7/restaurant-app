import React, { useEffect, useState } from 'react';
import Login from './LoginComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favourites from './FavouriteComponent';
import { Text, View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

const LoginNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
              textAlign: 'center'
            },
            headerLeft: () => (
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  name="menu" 
                  size={30} 
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{margin: 20}}>
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24} 
                  color="white"
                  onPress={() => navigation.navigate('Reserve a table')}
                />
              </TouchableOpacity>
            )
            }
          )
        }
      >
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
  </View>
  )
};

const HomeNavigator = () => {

  return (
  <View style={{ flex: 1 }}>
      <Stack.Navigator
      screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            textAlign: 'center'
          },
          headerLeft: () => (
            <TouchableOpacity style={{margin: 10}}>
              <Icon
                name="menu" 
                size={30} 
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{margin: 20}}>
              <Icon
                name="cutlery"
                type="font-awesome"
                size={24} 
                color="white"
                onPress={() => navigation.navigate('Reserve a table')}
              />
            </TouchableOpacity>
          )
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

const MenuNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={({navigation}) => ({
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
              textAlign: 'center'
            },
            headerRight: () => (
              <TouchableOpacity style={{margin: 20}}>
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24} 
                  color="white"
                  onPress={() => navigation.navigate('Reserve a table')}
                />
              </TouchableOpacity>
            )
            }
          )
        }
      >
        <Stack.Screen 
          name="Menu" 
          component={Menu}
          options={({navigation}) => ({
            headerLeft: () => (
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  name="menu" 
                  size={30} 
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
          )})}
        />
        <Stack.Screen name="Dishdetail" component={Dishdetail}/>
      </Stack.Navigator>
    </View>
  )
};

const ContactNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
        <Stack.Navigator
        screenOptions={({navigation}) => ({
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
              textAlign: 'center'
            },
            headerLeft: () => (
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  name="menu" 
                  size={30} 
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{margin: 20}}>
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24} 
                  color="white"
                  onPress={() => navigation.navigate('Reserve a table')}
                />
              </TouchableOpacity>
            )
            }
          )
        }
      >
      <Stack.Screen name="Contact" component={Contact}/>
    </Stack.Navigator>
  </View>
  )
};

const AboutUsNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
        <Stack.Navigator
        screenOptions={({navigation}) => ({
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
              textAlign: 'center'
            },
            headerLeft: () => (
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  name="menu" 
                  size={30} 
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{margin: 20}}>
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24} 
                  color="white"
                  onPress={() => navigation.navigate('Reserve a table')}
                />
              </TouchableOpacity>
            )
            }
          )
        }
      >
      <Stack.Screen name="About Us" component={About}/>
    </Stack.Navigator>
  </View>
  )
};

const ReservationNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={() => ({
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          }
        })
        }
        >
        <Stack.Screen 
          name="Reserve a table" 
          component={Reservation}
          options={({navigation}) => ({
            headerLeft: () => (
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  name="menu" 
                  size={30} 
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
          )})}
        />
        </Stack.Navigator>
      </View>
  );
};


const FavouritesNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
              textAlign: 'center'
            },
            headerLeft: () => (
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  name="menu" 
                  size={30} 
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{margin: 20}}>
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24} 
                  color="white"
                  onPress={() => navigation.navigate('Reserve a table')}
                />
              </TouchableOpacity>
            )
            }
          )
        }
      >
      <Stack.Screen name="Favourites" component={Favourites}/>
    </Stack.Navigator>
  </View>
  )
};

const Main = ({fetchDishes, fetchComments, fetchPromos, fetchLeaders}) => {

  useEffect(() => {
    fetchDishes();
    fetchLeaders();
    fetchComments();
    fetchPromos();
  }, []);

  const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props}/>
      </SafeAreaView>
    </DrawerContentScrollView>
  );

  const MainNavigator = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawerContentComponent}
      >
        <Drawer.Screen 
          name="Login" 
          component={LoginNavigator}
          options={{
            drawerLabel: "Login",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={26}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen 
          name="Home" 
          component={HomeNavigator}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen 
          name="Menu" 
          component={MenuNavigator}
          options={{
            drawerLabel: "Menu",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen 
          name="Contact" 
          component={ContactNavigator}
          options={{
            drawerLabel: "Contact",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={20}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen 
          name="About Us" 
          component={AboutUsNavigator}
          options={{
            drawerLabel: "About Us",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={28}
                color={tintColor}
              />
            )
          }}
        />
        <Drawer.Screen 
          name="Favourites" 
          initialRouteName="Favourites"
          component={FavouritesNavigator}
          options={() => ({
            drawerLabel: "Favourites",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="heart"
                type="font-awesome"
                size={23}
                color={tintColor}
              />
            )
          })}
        />
        <Drawer.Screen 
          name="Reserve Table" 
          initialRouteName="Menu"
          component={ReservationNavigator}
          options={() => ({
            drawerLabel: "Reserve a table",
            drawerIcon: ({tintColor}) => (
              <Icon
                name="cutlery"
                type="font-awesome"
                size={28}
                color={tintColor}
              />
            )
          })}
        />
      </Drawer.Navigator>
    );
  };

  const RootStackNavigator = () => {
    return (
    <RootStack.Navigator
        screenOptions={() => ({
          headerStyle: {
            backgroundColor: "#512DA8"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
        }})}
        model='modal'>
        <RootStack.Screen
          name='Main'
          component={MainNavigator}
          options={{ headerShown: false}}
        />
      <RootStack.Screen 
          name="Reserve a table" 
          component={Reservation}
      />
      <RootStack.Screen 
        name="Dishdetail" 
        component={Dishdetail}/>
    </RootStack.Navigator>
    );
  };

  return (
    <RootStackNavigator/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  drawerImage: {
    margin: 10,
    width: 60,
    height: 40
  }
});

export default connect('', mapDispatchToProps)(Main);