import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import db from '../Firebase/FirebaseConfig';
import FSection from '../components/FSection';
import VideoCard from '../components/VideoCard';

export default function All({ navigation }) {
  const [data, setData] = useState([]);

  // Funció per obtenir dades de la col·lecció ClipCloud
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ClipCloud'));
      const dataFromFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(dataFromFirestore); // Debug: Visualitzar dades al console.log
      setData(dataFromFirestore);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Executa fetchData quan el component es munta
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Personalitza el header aquí
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#121212', // Barra superior molt fosca
      },
      headerTintColor: '#572364', // Color lila per al text i les icones del header
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Mostra un missatge mentre es carreguen les dades */}
      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data}
          renderItem={({ item }) => (
            <VideoCard
              title={item.Title || "No Title"}
              singers={item.Singers || "Unknown Artist"}
              imageUrl={item.Image_URL || './assets/images/default_image.jpg'}
              url={item.Url || ""}
              color="#572364"  // Passant el color lila aquí
              onPress={() =>
                navigation.navigate("VideoDetails", {
                  title: item.Title,
                  singers: item.Singers,
                  imageUrl: item.Image_URL,
                  url: item.Url,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      )}

      {/* Barra inferior */}
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
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fons fosc per la pàgina general
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#bbb', // Text gris clar per la càrrega
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatList: {
    flexGrow: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1A1A', // Barra inferior més fosca
    borderTopWidth: 2,
    borderTopColor: '#572364', // Línia lila a la part superior de la barra
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 8, // Ombra suau per donar efecte flotant
  },
  header: {
    backgroundColor: '#121212', // Barra superior fosca
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#572364', // Líniua lila a la part inferior de la barra superior
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#572364', // Lila per al text del header
  },
  videoCard: {
    backgroundColor: '#1A1A1A', // Fons fosc per les cartes (més gris)
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    elevation: 5,
    marginHorizontal: 10,
  },
});
