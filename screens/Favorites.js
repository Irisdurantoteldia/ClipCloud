import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../Firebase/FirebaseConfig';
import FSection from '../components/FSection';

export default function Favorites({ navigation }) {
  const [videos, setVideos] = useState([]); // Vídeos de la llista "Favorites"

  // Carregar vídeos de la llista "Favorites"
  const loadFavoriteVideos = async () => {
    try {
      const videosQuery = query(
        collection(db, 'ClipCloud'),
        where('List', '==', 'Favorites') // Filtra els vídeos per la llista "Favorites"
      );
      const snapshot = await getDocs(videosQuery);
      const loadedVideos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(loadedVideos);
    } catch (error) {
      console.error('Error loading favorite videos: ', error);
      Alert.alert('Error', 'Failed to load favorite videos.');
    }
  };

  // Carregar dades quan es monta el component
  useEffect(() => {
    loadFavoriteVideos();
  }, []);

  // Funció per obrir el vídeo a la nova pantalla
  const openVideo = (videoUrl) => {
    let videoId = '';
    console.log("Video URL:", videoUrl);  // Log per veure la URL del vídeo

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      if (videoUrl.includes('youtube.com')) {
        const match = videoUrl.split('v=')[1]?.split('&')[0];
        if (match) {
          videoId = match;
        }
      } else if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl.split('youtu.be/')[1];
      }
    }

    console.log("Extracted Video ID:", videoId);  // Log per comprovar si el videoId és correcte
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      console.log("Embed URL:", embedUrl);  // Log per veure l'embed URL

      // Redirigeix a la pantalla del vídeo amb el vídeoId com a paràmetre
      navigation.navigate('VideoPlayer', { videoId });
    } else {
      console.error("Invalid video URL:", videoUrl);  // Si no es pot extreure el videoId
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Mostrar els vídeos favorits */}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openVideo(item.Url)} style={styles.videoItem}>
            <Text style={styles.videoTitle}>{item.Title}</Text>
            <Text style={styles.videoSinger}>By: {item.Singers}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={4} // Secció per la pantalla de favorites
          onPress={(id) => {
            if (id === 1) navigation.navigate('All');
            else if (id === 2) navigation.navigate('Feed');
            else if (id === 3) navigation.navigate('Add');
            else if (id === 4) navigation.navigate('Favorites');
            else if (id === 5) navigation.navigate('Account');
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
    paddingTop: 20,
  },
  videoItem: {
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#241178',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#673dff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoSinger: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    borderTopColor: '#673dff',
    borderTopWidth: 1,
  },
});
