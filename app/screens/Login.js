import React, { Component } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { Container } from '../components/Container';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

class Login extends Component {
  state = {
    email: '',
    password: '',
    authenticating: false,
  };

  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0',
      authDomain: 'react-native-firebase-20f8d.firebaseapp.com',
    };
    firebase.initializeApp(firebaseConfig);
  }
  onPressSingIn() {
    this.setState({
      authenticating: true,
    });
    console.log('hola mundo');
    const auth = firebase.auth();
    const emailAddress = this.state.email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.setState({
          authenticating: false,
        });
        console.log('ques asdo'); // Email sent.
      })
      .catch((error) => {
        // con An error happened.
        this.setState({
          authenticating: false,
        });
        console.log(error);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.form}>
        <Input
          placeholder="Enter your email..."
          label="Email"
          onChangeText={email => this.setState({ email })}
        />
        <Input
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          label="Enter your password, please"
          secureTextEntry
        />
        <Button onPress={() => this.onPressSingIn()}>Log in 1</Button>
      </View>
    );
  }
  render() {
    return <Container>{this.renderCurrentState()}</Container>;
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,
  },
});

export default Login;
