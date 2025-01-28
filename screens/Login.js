import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import FSection from '../components/FSection';

const backgroundImage = require('../assets/fondo.jpg');

export default function Login({ navigation }) {
    const handleLogin = () => {
        navigation.navigate('All');
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.loginBox}>
                <View style={styles.topButtons}>
                    {/* Botó Login: Lila perquè estem en la pàgina de Login */}
                    <TouchableOpacity
                        style={[styles.switchButton, styles.activeButton]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.switchButtonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Botó SignUp: Gris perquè estem en la pàgina de Login */}
                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.switchButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Welcome to ClipCloud!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="User..."
                    keyboardType="email-address"
                    placeholderTextColor="#ccc"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    secureTextEntry
                    placeholderTextColor="#ccc"
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity>
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
        backgroundColor: '#333', // Gris per els botons inactius
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        flex: 1,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#572364', // Lila per botó actiu
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
        color: '#572364',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#572364',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#1f1f1f',
        color: '#fff',
    },
    button: {
        backgroundColor: '#572364',
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
        borderWidth: 0,
        marginBottom: 0,
    },
});
