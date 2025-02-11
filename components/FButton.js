import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FButton({ 
    selectedIcon,
    unselectedIcon,
    id,
    isSelected,
    onPress,
    isCircular = false, // Propietat per determinar si és circular
    color = "#9265ff" // El color lila per defecte
}) {
    return (
        <TouchableOpacity onPress={() => onPress(id)} style={styles.buttonContainer}>
            <View style={[styles.iconContainer, isCircular && styles.circular]}>
                <Icon
                    name={isSelected ? selectedIcon : unselectedIcon}
                    size={isCircular ? 40 : 30} // Mida de l'icona
                    color={isSelected ? color : "#2510a3"} // Lila si seleccionat, gris si no
                    style={styles.icon}
                />
                {isSelected && <View style={[styles.selectedLine, { backgroundColor: color }]} />}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center', // Centrar el botó horitzontalment
        justifyContent: 'center', // Centrar el contingut del botó dins
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center', // Centrar l'icona dins del contenidor
        paddingBottom: 10, // Aixeca lleugerament els ícons si cal
    },
    circular: {
        backgroundColor: '#FFF', // Fons blanc per als botons circulars
        borderRadius: 50, // Fa que el botó sigui circular
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Ombra per fer-lo més destacat
    },
    icon: {
        margin: 5,
    },
    selectedLine: {
        height: 2,
        width: 50,
        marginTop: 5,
    },
});
