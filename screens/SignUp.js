import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import FSection from '../components/FSection';
import { auth, db } from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const backgroundImage = require('../assets/fondo.jpg');

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password === confirmPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                });

                navigation.navigate('All');
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'Passwords do not match');
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.loginBox}>
                <View style={styles.topButtons}>
                    <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.switchButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.switchButton, styles.activeButton]}>
                        <Text style={styles.switchButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Welcome to ClipCloud!</Text>

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

                <TextInput
                    style={styles.input}
                    placeholder="Repeat Password..."
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholderTextColor="#ccc"
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <FSection currentSection={3} onPress={() => {}} />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2510a3',
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
});

