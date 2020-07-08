import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const Login = () => {

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
          title='Login'
          color='#512DA8'
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
});


export default Login;