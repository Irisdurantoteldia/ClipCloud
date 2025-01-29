import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {db, auth} from '../Firebase/FirebaseConfig';
import FSection from '../components/FSection';
import { WebView } from 'react-native-webview';

export default function Feed({ navigation }) {
  const [lists, setLists] = useState([]); // Llistes
  const [selectedList, setSelectedList] = useState(null); // Llista seleccionada
  const [videos, setVideos] = useState([]); // Vídeos de la llista seleccionada
  const [videoId, setVideoId] = useState(null); // ID del video para el WebView
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false); // Estado del modal

  // Funció per carregar tots els vídeos (mostra totes les llistes)
  const loadVideos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ClipCloud'));
      const loadedVideos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(loadedVideos);
    } catch (error) {
      console.error('Error loading videos: ', error);
      Alert.alert('Error', 'Failed to load videos.');
    }
  };

  // Funció per carregar vídeos d'una llista
  const loadVideosByList = async (listName) => {
    try {
      const videosQuery = query(
        collection(db, 'ClipCloud'),
        where('List', '==', listName)
      );
      const snapshot = await getDocs(videosQuery);
      const loadedVideos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(loadedVideos);
      setSelectedList(listName);
    } catch (error) {
      console.error('Error loading videos by list: ', error);
      Alert.alert('Error', 'Failed to load videos.');
    }
  };

  // Funció per carregar les llistes úniques
  const loadLists = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ClipCloud'));
      const allVideos = snapshot.docs.map((doc) => doc.data());
      const uniqueLists = [...new Set(allVideos.map((video) => video.List).filter((list) => list))];
      setLists(uniqueLists);
    } catch (error) {
      console.error('Error loading lists: ', error);
      Alert.alert('Error', 'Failed to load lists.');
    }
  };

  // Función para abrir el video en el modal
  const openVideo = (videoUrl) => {
    let videoId = '';
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      videoId = videoUrl.includes('v=') 
        ? videoUrl.split('v=')[1].split('&')[0] 
        : videoUrl.split('youtu.be/')[1];
    }
    setVideoId(videoId);
    setIsVideoModalVisible(true);
  };

  // Carregar dades al muntar el component
  useEffect(() => {
    loadLists();
    loadVideos();
  }, []);

  return (
    <View style={styles.container}>
      {selectedList === null ? (
        // Mostra totes les llistes
        <FlatList
          data={lists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => loadVideosByList(item)}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Mostra els vídeos de la llista seleccionada
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
      )}

      {/* Botó per tornar enrere */}
      {selectedList !== null && (
        <TouchableOpacity onPress={() => setSelectedList(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Lists</Text>
        </TouchableOpacity>
      )}

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={2}
          onPress={(id) => {
            if (id === 1) navigation.navigate('All');
            else if (id === 2) navigation.navigate('Feed');
            else if (id === 3) navigation.navigate('Add');
            else if (id === 4) navigation.navigate('Favorites');
            else if (id === 5) navigation.navigate('Account');
          }}
        />
      </View>

      {/* Modal del video */}
      {isVideoModalVisible && videoId && (
        <View style={styles.videoModal}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={styles.webView}
            allowsFullscreenVideo={true}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVideoModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    paddingTop: 20,
  },
  listItem: {
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
  listText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  videoUrl: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  backButton: {
    backgroundColor: '#673dff',
    paddingVertical: 12,
    marginTop: 20,
    marginHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  videoModal: {
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,
    bottom: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderRadius: 10,
  },
  webView: { width: '90%', height: 300 },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginBottom: 50,
  },
  closeText: { color: '#fff', fontSize: 16 },
});

