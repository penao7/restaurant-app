import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Animated } from 'react-native';
import { ImageManipulator } from 'expo-image-manipulator';

const Login = createBottomTabNavigator();

const LoginTab = ({navigation}) => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    remember: false
  });

  useEffect(() => {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        return (
          userinfo 
            ? setCredentials({...credentials, 
                username: userinfo.username, 
                password: userinfo.password,
                remember: true
              })
            : ''
        );
      });

  }, []);

  const handleLogin = () => {
    console.log(JSON.stringify(credentials));
    return (
      credentials.remember
        ? SecureStore.setItemAsync(
            'userinfo',
            JSON.stringify({ 
              username: credentials.username, 
              password: credentials.password
            })
          )
          .catch(err => console.log('Could not save user info', err))

        : SecureStore.deleteItemAsync('userinfo')
            .catch(err => console.log('Could not save user info', err))
    );
  };

  return (
    <View style={styles.container}>
      <Input 
        placeholder='Username'
        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
        onChangeText={(username => setCredentials({...credentials, username: username}))}
        value={credentials.username}
      />
      <Input 
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'key'}}
        onChangeText={(password => setCredentials({...credentials, password: password}))}
        value={credentials.password}
        secureTextEntry={true}
      />
      <CheckBox
        title='Remember Me'
        center
        checked={credentials.remember}
        onPress={() => setCredentials({...credentials, remember: !credentials.remember})}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button
          onPress={() => handleLogin()}
          title=' Login'
          icon=
          {
            <Icon 
              name='sign-in' 
              type='font-awesome'
              size={24}
              color='white'
            />
          }
          buttonStyle={{ backgroundColor: '#512DA8' }}
        />
      </View>
      <View style={styles.formButton}>
        <Button
          onPress={() => navigation.navigate('Register')}
          title=' Register'
          type='clear'
          icon=
          {
            <Icon 
              name='user-plus'
              type='font-awesome'
              size={24}
              color='blue'
            />
          }
          titleStyle={{ color: 'blue' }}
        />
      </View>
    </View>

  );
};

const RegisterTab = () => {

  const [registerationInfo, setRegisterationInfo] = useState({
    username: '',
    password: '',
    firsname: '',
    lastname: '',
    email: '',
    remember: false,
    imageUrl: baseUrl + 'images/logo.png'
  });

  const getImageFromCamera = async () => {

    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
      });
      
      if(!capturedImage.cancelled) {
        processImage(capturedImage.uri);
      };
    };
  };

  const processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulate(
      imageUri, 
        [
          { resize: { width: 400 }}
        ],
        { format: 'png'}
    );
    setRegisterationInfo({...registerationInfo, image: processedImage.uri})
  };

  const handleRegisteration = () => {
    console.log(JSON.stringify(registerationInfo));
    return (
      registerationInfo.remember
        ? SecureStore.setItemAsync(
            'userinfo',
            JSON.stringify({ 
              username: i.username, 
              password: i.password,
            })
          )
          .catch(err => console.log('Could not save user info', err))

        : SecureStore.deleteItemAsync('userinfo')
            .catch(err => console.log('Could not save user info', err))
    );
  };
 
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: registerationInfo.imageUrl }}
            loadingIndicatorSource={require('./images/uthappizza.png')}
            style={styles.image}
          />
          <Button
            title='Camera'
            onPress={getImageFromCamera}
            buttonStyle={{ backgroundColor: '#9575CD'}}
          />
        </View>
        <Input 
          placeholder='Username'
          name="username"
          leftIcon={{ type: 'font-awesome', name: 'user-o'}}
          onChangeText={(username=> setRegisterationInfo({...registerationInfo, username: username}))}
          value={registerationInfo.username}
        />
        <Input 
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key'}}
          onChangeText={(password => setRegisterationInfo({...registerationInfo, password: password}))}
          value={registerationInfo.password}
          secureTextEntry={true}
        />
        <Input 
          placeholder='Firstname'
          leftIcon={{ type: 'font-awesome', name: 'user-o'}}
          onChangeText={(firstname => setRegisterationInfo({...registerationInfo, firstname: firstname}))}
          value={registerationInfo.firstname}
        />
        <Input 
          placeholder='Lastname'
          leftIcon={{ type: 'font-awesome', name: 'user-o'}}
          onChangeText={(lastname => setRegisterationInfo({...registerationInfo, lastname: lastname}))}
          value={registerationInfo.lastname}
        />
        <Input 
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
          onChangeText={(email => setRegisterationInfo({...registerationInfo, email: email}))}
          value={registerationInfo.email}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={registerationInfo.remember}
          onPress={() => setRegisterationInfo({...registerationInfo, remember: !registerationInfo.remember})}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => handleRegisteration()}
            title=' Register'
            icon=
            {
              <Icon 
                name='user-plus' 
                type='font-awesome'
                size={24}
                color='white'
              />
            }
            buttonStyle={{ backgroundColor: '#512DA8' }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const LoginTabs = () => {
  return (
    <Login.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = 'sign-in'
          } else if (route.name === 'Register') {
            iconName = 'user-plus'
          }

          return <Icon name={iconName} type='font-awesome' size={size} color={color} />;
        },
      })}

      tabBarOptions={{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
      }}
    >
      <Login.Screen 
        name="Login"
        component={LoginTab}        
      />
      <Login.Screen name="Register" component={RegisterTab}/>
    </Login.Navigator>
  );
};

const BottomBar = (props) => {
  return (
      <LoginTabs {...props} style={{backgroundColor: 'transparent'}}/>
      
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 60,
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
});

export default LoginTabs;