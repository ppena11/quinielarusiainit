import React, { Component } from 'react';
import { ActivityIndicator, View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { Container } from '../components/Container';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';
import { RecuperarContrasena } from '../components/RecuperarContrasena';

class Login extends Component {
  state = {
    email: '',
    password: '',
    authenticating: false,
    indication: '',
    placeholder: 'Ingresa tu correo electrónico...',
  };

  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0',
      authDomain: 'react-native-firebase-20f8d.firebaseapp.com',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  onPressSingIn() {
    this.setState({
      authenticating: true,
      placeholder: 'Ingresa tu correo electrónico...',
    });

    const auth = firebase.auth();
    const emailAddress = this.state.email;
    const password = this.state.password;

    auth
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        this.setState({
          authenticating: false,
        });
        console.log('Logueado...'); // //logueado
      })
      .catch((error) => {
        // con An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/user-disabled':
            this.setState({
              authenticating: false,
              indication: 'El correo electrónico ha sido deshabilitado',
            });
            break;
          case 'auth/invalid-email':
            this.setState({
              authenticating: false,
              indication: 'El correo electrónico no es válido',
            });
            break;
          case 'auth/user-not-found':
            this.setState({
              authenticating: false,
              indication: 'El correo electrónico no se encuentra registrado',
            });
            break;
          case 'auth/wrong-password':
            // this.inputCorreo.placeholder = emailAddress;

            this.setState({
              authenticating: false,
              placeholder: emailAddress,
              indication: 'La contraseña es incorrecta',
            });
            break;
          default:
            this.setState({
              authenticating: false,
              indication: errorCode,
            });
          // etc
        }

        console.log(errorMessage);
      });
  }

  onPressCrearCuenta() {
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
          <StatusBar translucent={false} barStyle="light-content" />
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.form}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <Input
            placeholder={this.state.placeholder}
            label="Correo electrónico"
            onChangeText={email => this.setState({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => console.log(this.inputCorreo)}
          />
          <Input
            onChangeText={password => this.setState({ password })}
            placeholder="Ingresa tu contraseña..."
            label="Contrasdfsdfdsfgseñassdasdsa"
            secureTextEntry
            autoCapitalize="none"
            ref={(input) => {
              this.inputCorreo = input;
            }}
          />
          <RecuperarContrasena>
            <Text>Recuperar contraseña...</Text>
          </RecuperarContrasena>
          <Button onPress={() => this.onPressSingIn()}>Entrar</Button>
          <Button onPress={() => this.onPressCrearCuenta()}>Crear cuenta</Button>
          <TextIndication description={this.state.indication} />
        </KeyboardAvoidingView>
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
