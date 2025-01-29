import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import FSection from '../components/FSection';
import {db,auth} from '../Firebase/FirebaseConfig';

export default function Add({ navigation }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [singer, setSinger] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [lists, setLists] = useState([]);

  // Funció per carregar les llistes existents
  const loadLists = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ClipCloud'));
      const allLists = snapshot.docs.map((doc) => doc.data().List).filter((list) => list);
      const uniqueLists = [...new Set(allLists)];
      setLists(uniqueLists);
    } catch (error) {
      console.error('Error loading lists: ', error);
      Alert.alert('Error', 'Failed to load lists.');
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  const handleSaveVideo = async () => {
    const finalList = selectedList === 'new' ? newListName : selectedList;

    if (!title || !url || !singer || !finalList) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'ClipCloud'), {
        Title: title,
        Url: url,
        Singers: singer,
        List: finalList,
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Video has been added successfully!');
      navigation.navigate('All');
    } catch (error) {
      console.error('Error adding video: ', error);
      Alert.alert('Error', 'Failed to add video.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter video title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter video URL"
        placeholderTextColor="#aaa"
        value={url}
        onChangeText={setUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter creator's name"
        placeholderTextColor="#aaa"
        value={singer}
        onChangeText={setSinger}
      />

      <View style={styles.listContainer}>
        <Text style={styles.label}>Select or Create a List</Text>
        <Picker
          selectedValue={selectedList}
          onValueChange={(value) => setSelectedList(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select a list" value="" />
          {lists.map((list, index) => (
            <Picker.Item label={list} value={list} key={index} />
          ))}
          <Picker.Item label="Create New List" value="new" />
        </Picker>
        {selectedList === 'new' && (
          <TextInput
            style={styles.input}
            placeholder="Enter new list name"
            placeholderTextColor="#aaa"
            value={newListName}
            onChangeText={setNewListName}
          />
        )}
      </View>

      <Button title="Save Video" onPress={handleSaveVideo} />
      <Button title="Cancel" onPress={() => navigation.navigate('All')} />

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={3}
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
    justifyContent: 'center',
    padding: 20,
    marginTop: -60,
    backgroundColor: '#1d1d1d',
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
  input: {
    backgroundColor: '#241178',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  listContainer: {
    marginVertical: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  picker: {
    marginTop: 10,
    backgroundColor: '#241178',
    color: '#ffffff',
    borderRadius: 8,
  },
});
