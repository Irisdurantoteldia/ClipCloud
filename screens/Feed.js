import React from 'react';
import { View, StyleSheet } from 'react-native';
import FSection from '../components/FSection';

export default function Feed({ navigation }) {
  return (
    <View style={styles.container}>
    
      {/* Barra de navegació inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={2}
          onPress={(id) => {
            if (id === 1) navigation.navigate("All");
            else if (id === 2) navigation.navigate("Feed");
            else if (id === 3) navigation.navigate("Add");
            else if (id === 4) navigation.navigate("Favorites");
            else if (id === 5) navigation.navigate("Account");
          }}
        />
      </View>
    </View>
  );
}

// Estils
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fons blanc
  },
  topBar: {
    height: 80,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    position: 'absolute', // Posiciona absolutament la barra inferior
    bottom: 0, // Ancorar a la part inferior
    left: 0,
    right: 0,

    backgroundColor: '#FFF', // Fons blanc per la barra inferior
    borderTopWidth: 1, // Línia superior de la barra
    borderTopColor: '#ccc', // Color de la línia
  },
});
