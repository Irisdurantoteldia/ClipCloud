import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Linking, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FSection from '../components/FSection';
import { auth } from '../Firebase/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);
    }
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert('Error', 'No es pot tancar la sessió. Prova més tard.');
        console.error(error);
      });
  };

  const handleSocialLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} style={styles.profileImage} />

        {/* Nom d'usuari (correu electrònic, no editable) */}
        <TextInput
          style={[styles.inputField, { color: '#888' }]}
          value={email}
          editable={false}
          placeholder="El teu correu electrònic"
        />

        <View style={styles.separator} />

        {/* Xarxes socials */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLink('https://www.instagram.com/')}>
            <Image source={require('../assets/instagramLogo.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLink('https://www.youtube.com/')}>
            <Image source={require('../assets/ytbLogo.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* Botó per tancar sessió */}
        <Text style={styles.logoutPrompt}>Vols tancar sessió?</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Tancar Sessió</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <FSection
          currentSection={5}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    borderTopColor: '#673dff',
    borderTopWidth: 1,
  },
  profileContainer: {
    width: '85%',
    backgroundColor: '#241178',
    borderRadius: 10,
    padding: 20,
    marginTop: -50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#673dff',
    marginBottom: 15,
  },
  inputField: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#333',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#673dff',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#673dff',
    marginVertical: 15,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  socialButton: {
    marginHorizontal: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoutPrompt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
