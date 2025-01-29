import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import FSection from '../components/FSection';
import { WebView } from 'react-native-webview';

export default function All({ navigation }) {
  const [data, setData] = useState([]);

  // Funció per obtenir la informació dels vídeos de Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ClipCloud'));
      const dataFromFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Data from Firestore:", dataFromFirestore); // Log de les dades obtingudes
      setData(dataFromFirestore);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
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
      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.videoCard}
              onPress={() => openVideo(item.Url)} // Passa l'URL del vídeo
            >
              <Text style={styles.title}>{item.Title || "No Title"}</Text>
              <Text style={styles.singers}>{item.Singers || "Unknown Artist"}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      )}

      <View style={styles.bottomBar}>
        <FSection
          currentSection={1}
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
  container: { flex: 1, backgroundColor: '#1d1d1d' },
  listContainer: { paddingBottom: 100, paddingTop: 10, paddingHorizontal: 16 },
  noDataContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#bbb', fontSize: 18, fontWeight: 'bold' },
  flatList: { flexGrow: 1 },
  videoCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#241178',
    borderColor: '#673dff',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  singers: { color: '#bbb', fontSize: 14, marginTop: 5 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    borderTopColor: '#673dff',
    borderTopWidth: 1,
  },
});
