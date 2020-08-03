import React, { useEffect } from 'react';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import { LoginNavigator } from './NavigatorComponents'
import { FavouritesNavigator } from './NavigatorComponents'
import { HomeNavigator } from './NavigatorComponents'
import { ContactNavigator } from './NavigatorComponents'
import { AboutUsNavigator } from './NavigatorComponents'
import { MenuNavigator } from './NavigatorComponents'
import { ReservationNavigator } from './NavigatorComponents'
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { 
  fetchDishes, 
  fetchComments, 
  fetchPromos, 
  fetchLeaders, 
  logoutUser, 
  fetchFavourites, 
  authValidation } from '../redux/ActionCreators';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapDispatchToProps = dispatch => ({
  authValidation: () => dispatch(authValidation()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchFavourites: () => dispatch(fetchFavourites()),
  logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const Main = ({ 
  fetchDishes, 
  fetchFavourites, 
  fetchComments, 
  fetchPromos, 
  fetchLeaders, 
  auth, 
  logoutUser, 
  authValidation 
}) => {

  const handleConnectivityChange = (state) => {
    switch (state.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.SHORT);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.SHORT);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular network!', ToastAndroid.SHORT);
        break;
      case 'unknown':
        ToastAndroid.show('You now have an unknown connection!', ToastAndroid.SHORT);
        break;
      default:
        break;
    }
  };

  const unsubscribe = () => NetInfo.addEventListener(handleConnectivityChange);

  useEffect(() => {
    authValidation();
    fetchDishes();
    fetchLeaders();
    fetchComments();
    fetchPromos();
    fetchFavourites();

    NetInfo.addEventListener(handleConnectivityChange);

    return (
      unsubscribe()
    );

  }, []);

  const LoggedIn = (props) => {
    return ( 
      auth.isAuthenticated
      ?
      <View>
        <DrawerItem
          label="Logout"
          onPress={() => {
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                { text: 'Cancel', onPress: () => { return null } },
                {
                  text: 'Confirm', onPress: () => {
                    logoutUser();
                    props.navigation.navigate('Login')
                  }
                },
              ],
              { cancelable: false }
            )
          }}
          icon={({ tintColor }) => (
            <Icon
              name="sign-out"
              type="font-awesome"
              color={tintColor}
            />
          )}
        />
        <DrawerItem
          label="Favourites"
          onPress={() => { props.navigation.navigate('Favourites') }}
          icon={({ tintColor }) => (
            <Icon
              name="heart"
              type="font-awesome"
              color={tintColor}
              size={23}
            />
          )}
        />
      </View>
      :
      <DrawerItem
        label="Login"
        onPress={() => props.navigation.navigate('Login')}
        icon={({ tintColor }) => (
          <Icon
            name="sign-in"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        )}
      />
    );
  };
 
  const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <LoggedIn {...props} />
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView >
  );

  const MainNavigator = () => {

    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawerContentComponent}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ tintColor }) => (
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
            drawerIcon: ({ tintColor }) => (
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
            drawerIcon: ({ tintColor }) => (
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
            drawerIcon: ({ tintColor }) => (
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
          name="Reserve Table"
          initialRouteName="Menu"
          component={ReservationNavigator}
          options={() => ({
            drawerLabel: "Reserve a table",
            drawerIcon: ({ tintColor }) => (
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
          headerTitleAlign: 'center'
        })}
        model='modal'>
        <RootStack.Screen
          name='Main'
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Reserve a table"
          component={Reservation}
        />
        <RootStack.Screen
          name="Login"
          component={LoginNavigator}
        />
        <RootStack.Screen
          name="Favourites"
          component={FavouritesNavigator}
        />
        <RootStack.Screen
          name="Dishdetail"
          component={Dishdetail}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity style={{ margin: 20 }}>
                <Icon
                  name="cutlery"
                  type="font-awesome"
                  size={24}
                  color="white"
                  onPress={() => navigation.navigate('Reserve a table')}
                />
              </TouchableOpacity>
            )
          })}
        />
      </RootStack.Navigator>
    );
  };

  return (
    <RootStackNavigator />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);