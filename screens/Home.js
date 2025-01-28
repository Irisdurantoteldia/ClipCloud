import React from 'react';
import { View, Image, Button, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Home({ navigation }) {

  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id == 2) {
      navigation.navigate("Login");
    } else if (id == 3) {
      navigation.navigate("SignUp");
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')} // Assegura't que la ruta és correcta
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Imatge del logo al centre de la pantalla */}
        <Image
          source={require('../assets/logo.png')} // Assegura't que la ruta és correcta
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Botons a la part inferior de la pantalla */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Estils per al component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between', // Col·loca el contingut de manera espaiada
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centra la imatge verticalment
    alignItems: 'center', // Centra la imatge horitzontalment
  },
  logo: {
    width: 200, // Amplada del logo augmentada
    height: 200, // Alçada del logo augmentada
  },
  buttonContainer: {
    marginBottom: 50, // Margen inferior per allunyar els botons de la part inferior
    width: '80%', // Amplada del contenidor dels botons
    alignSelf: 'center', // Centra el contenidor horitzontalment
  },
  button: {
    marginVertical: 10, // Espai entre botons
    borderRadius: 10, // Arrodoniment dels racons
    overflow: 'hidden', // Amaga les parts que sobresurten
    backgroundColor: '#572364', // Color lila fosc
    paddingVertical: 15, // Espai vertical dins del botó
    alignItems: 'center', // Centra el text horitzontalment
  },
  buttonText: {
    color: 'white', // Color del text
    fontSize: 16, // Mida del text
    fontWeight: 'bold', // Text en negreta
  },
});
