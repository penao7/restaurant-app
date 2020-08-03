import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Animated, Platform } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux';
import { loginUser, postUser } from '../redux/ActionCreators'
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const Login = createBottomTabNavigator();

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    users: state.users,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (creds, remember, cb) => dispatch(loginUser(creds, remember, cb)),
  postUser: (creds, cb) => dispatch(postUser(creds, cb))
});

const LoginTab = ({ nav, loginUser, auth }) => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    remember: false
  });

  const handleViewRef = useRef('');

  useEffect(() => {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        return (
          userinfo
            ? setCredentials({
              ...credentials,
              username: userinfo.creds.username,
              password: userinfo.creds.password,
              remember: true
            })
            : ''
        );
      });

  }, []);

  const handleLogin = () => {

    const creds = {
      username: credentials.username,
      password: credentials.password
    };

    if (creds.username && creds.password) {

      loginUser(creds, credentials.remember, (err, verify) => {
        if (verify) {
          nav.goBack();
          alert('Logged in succesfully!');
        } else {
          alert(err);
        }
      });

    } else {
      alert('Please insert correct type of credentials')
    };
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Animatable.View
          ref={handleViewRef}
          animation="fadeIn"
          duration={1000}
          delay={0}
        >
          <Input
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(username => setCredentials({ ...credentials, username: username }))}
            value={credentials.username}
          />
          <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={(password => setCredentials({ ...credentials, password: password }))}
            value={credentials.password}
            secureTextEntry={true}
          />
          <CheckBox
            title='Remember Me'
            center
            checked={credentials.remember}
            onPress={() => setCredentials({ ...credentials, remember: !credentials.remember })}
            containerStyle={styles.formCheckbox}
          />
          {auth.isLoading
            ? <Loading />
            :
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
          }
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
        </Animatable.View>
      </View>
    </ScrollView>

  );
};

const RegisterTab = ({ postUser, users, nav }) => {

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

    const { status } = await Camera.requestPermissionsAsync();

    if (status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!capturedImage.cancelled) {
        processImage(capturedImage.uri);
      };
    };
  };

  const getImageFromGallery = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let galleryImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!galleryImage.cancelled) {
        processImage(galleryImage.uri);
      };
    };
  };

  const processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: ImageManipulator.SaveFormat.PNG }
    );

    setRegisterationInfo({ ...registerationInfo, imageUrl: processedImage.uri })
  };

  const handleRegisteration = () => {

    const creds = {
      username: registerationInfo.email,
      password: registerationInfo.password,
      remember: registerationInfo.remember
    };

    return (
      postUser(creds, (err, verify) => {
        if (verify) {
          nav.popToTop();
          alert('Registeration completed and signed in succesfully!')
        } else {
          alert(err)
        };
      })
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Animatable.View
          animation="fadeIn"
          duration={1000}
          delay={0}
        >
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: registerationInfo.imageUrl }}
                loadingIndicatorSource={require('./images/uthappizza.png')}
                style={styles.image}
              />
              <View style={{ flex: 1 }}>
                <Button
                  title='Camera'
                  onPress={getImageFromCamera}
                  buttonStyle={{ backgroundColor: '#9575CD' }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title='Gallery'
                  onPress={getImageFromGallery}
                  buttonStyle={{ backgroundColor: '#9575CD', marginLeft: 10 }}
                />
              </View>
            </View>
            {/* <Input
          placeholder='Username'
          name="username"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(username => setRegisterationInfo({ ...registerationInfo, username: username }))}
          value={registerationInfo.username}
        /> */}
            <Input
              placeholder='Email'
              leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
              onChangeText={(email => setRegisterationInfo({ ...registerationInfo, email: email }))}
              value={registerationInfo.email}
            />
            <Input
              placeholder='Password'
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              onChangeText={(password => setRegisterationInfo({ ...registerationInfo, password: password }))}
              value={registerationInfo.password}
              secureTextEntry={true}
            />
            {/* <Input
          placeholder='Firstname'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(firstname => setRegisterationInfo({ ...registerationInfo, firstname: firstname }))}
          value={registerationInfo.firstname}
        />
        <Input
          placeholder='Lastname'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(lastname => setRegisterationInfo({ ...registerationInfo, lastname: lastname }))}
          value={registerationInfo.lastname}
        /> */}
            <CheckBox
              title='Remember Me'
              center
              checked={registerationInfo.remember}
              onPress={() => setRegisterationInfo({ ...registerationInfo, remember: !registerationInfo.remember })}
              containerStyle={styles.formCheckbox}
            />
            {
              users.isLoading
                ?
                <Loading />
                :
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
            }
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const LoginTabs = ({ loginUser, postUser, navigation, users, auth }) => {

  const LoginPage = () => {
    return <LoginTab
      loginUser={loginUser}
      nav={navigation}
      auth={auth}
    />
  };

  const RegisterPage = () => {
    return <RegisterTab
      postUser={postUser}
      nav={navigation}
      users={users}
    />
  }

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
        component={LoginPage}
      />
      <Login.Screen name="Register" component={RegisterPage} />
    </Login.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 8,
    flex: 1
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginTabs);