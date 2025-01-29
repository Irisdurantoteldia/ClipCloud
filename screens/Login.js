import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import FSection from '../components/FSection';
import { auth } from '../Firebase/FirebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const backgroundImage = require('../assets/fondo.jpg');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Si us plau, introdueix el teu correu electrònic i contrasenya.');
      return;
    }
    setErrorMsg(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login correcte!');
      navigation.navigate('All');
    } catch (error) {
      console.log('Error iniciant sessió:', error.code, error.message);
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg('El correu electrònic no és vàlid.');
          break;
        case 'auth/user-not-found':
          setErrorMsg('Aquest usuari no existeix.');
          break;
        case 'auth/wrong-password':
          setErrorMsg('La contrasenya és incorrecta.');
          break;
        default:
          setErrorMsg('Hi ha hagut un error inesperat. Torna-ho a intentar.');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Si us plau, introdueix el teu correu electrònic per recuperar la contrasenya.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Correu enviat!', 'Revisa la teva bústia d\'entrada per restablir la contrasenya.');
    } catch (error) {
      console.log('Error enviant el correu de recuperació:', error.code, error.message);
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg('El correu electrònic no és vàlid.');
          break;
        case 'auth/user-not-found':
          setErrorMsg('Aquest correu electrònic no està registrat.');
          break;
        default:
          setErrorMsg('Hi ha hagut un error inesperat. Torna-ho a intentar.');
      }
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.loginBox}>
        <View style={styles.topButtons}>
          <TouchableOpacity style={[styles.switchButton, styles.activeButton]}>
            <Text style={styles.switchButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.switchButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Welcome to ClipCloud!</Text>

        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <TextInput
          style={styles.input}
          placeholder="User..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.input}
          placeholder="Password..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <FSection currentSection={2} onPress={() => {}} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  switchButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#2510a3',
  },
  switchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2510a3',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#673dff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#1f1f1f',
    color: '#fff',
  },
  button: {
    backgroundColor: '#2510a3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#bbb',
    marginTop: 10,
  },
});