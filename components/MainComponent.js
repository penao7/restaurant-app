import React, { useEffect } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import { Text, View, Platform, Image, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

const HomeNavigator = () => {
  return (
  <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: "#512DA8"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff"
          },
          headerLeft: () => (
            <Icon
              name="menu" 
              size={24} 
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })
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
      <Stack.Navigator initialRouteName="Menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#512DA8"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff"
          }
        }}
      >
        <Stack.Screen 
          name="Menu" 
          component={Menu}
          options={({navigation}) => ({ 
            headerLeft: () => (
              <Icon
                name="menu" 
                size={24} 
                color="white" 
                onPress={() => navigation.toggleDrawer()}
              />
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
        initialRouteName="Contact"
        screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: "#512DA8"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff"
          },
          headerLeft: () => (
            <Icon
              name="menu" 
              size={24} 
              color="white" 
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })
      }
    >
      <Stack.Screen name="Contact" component={Contact}/>
    </Stack.Navigator>
  </View>
  )
};

const AboutUsNavigator = () => {
  return (
  <View style={{ flex: 1}}>
      <Stack.Navigator initialRouteName="AboutUs"
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff"
        },
        headerLeft: () => (
          <Icon
            name="menu" 
            size={24} 
            color="white" 
            onPress={() => navigation.toggleDrawer()}
          />
        )
      })
    }
    >
      <Stack.Screen name="About Us" component={About}/>
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
          name ="Menu" 
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
      </Drawer.Navigator>
    );
  };

  return (
    <MainNavigator/>
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