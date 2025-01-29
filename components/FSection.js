import React from 'react';
import { View } from 'react-native';
import FButton from './FButton';

export default function FSection({ currentSection, onPress }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <FButton
        selectedIcon="home"
        unselectedIcon="home-outline"
        id={1}
        onPress={onPress}
        isSelected={currentSection == 1}
        color="#673dff" // Lila per defecte
        style={currentSection == 1 ? { fontWeight: 'bold' } : null} // Estil per icona seleccionada
      />

      <FButton
        selectedIcon="animation-play"
        unselectedIcon="animation-play-outline"
        id={2}
        onPress={onPress}
        isSelected={currentSection == 2}
        color="#673dff" // Lila per defecte
        style={currentSection == 2 ? { fontWeight: 'bold' } : null} // Estil per icona seleccionada
      />

      <FButton
        selectedIcon="plus-circle"
        unselectedIcon="plus-circle-outline"
        id={3}
        onPress={onPress}
        isSelected={currentSection == 3}
        color="#673dff" // Lila per defecte
        style={currentSection == 3 ? { fontWeight: 'bold' } : null} // Estil per icona seleccionada
      />

      <FButton
        selectedIcon="heart"
        unselectedIcon="heart-outline"
        id={4}
        onPress={onPress}
        isSelected={currentSection == 4}
        color="#673dff" // Lila per defecte
        style={currentSection == 4 ? { fontWeight: 'bold' } : null} // Estil per icona seleccionada
      />

      <FButton
        selectedIcon="account"
        unselectedIcon="account-outline"
        id={5}
        onPress={onPress}
        isSelected={currentSection == 5}
        color="#673dff" // Lila per defecte
        style={currentSection == 5 ? { fontWeight: 'bold' } : null} // Estil per icona seleccionada
      />
    </View>
  );
}
