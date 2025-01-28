import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const VideoCard = ({
  title = "Title",
  singers = "Unknown Singer",
  imageUrl,
  url,
}) => {
  // Font d'imatge amb fallback per si no arriba una URL vàlida
  const imageSource = imageUrl
    ? { uri: imageUrl }
    : require('../assets/default_image.jpg');

  // Funció per obrir la URL
  const openUrl = () => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    } else {
      console.log('No URL provided.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Títol */}
      <Text style={styles.title}>{title}</Text>

      {/* Contingut amb imatge i informació */}
      <View style={styles.rowContainer}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>By: {singers}</Text>
        </View>
      </View>

      {/* Botó per obrir la URL */}
      <TouchableOpacity style={styles.urlButton} onPress={openUrl}>
        <Text style={styles.urlButtonText}>Watch Video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    elevation: 5,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  image: {
    width: '40%',
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    width: '55%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 7,
  },
  urlButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  urlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoCard;
