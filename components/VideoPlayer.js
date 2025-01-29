import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoPlayer({ videoUrl }) {
  let embedUrl = '';

  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = videoUrl.includes('v=')
      ? videoUrl.split('v=')[1].split('&')[0]
      : videoUrl.split('youtu.be/')[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Invalid video URL</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.video}
        allowsFullscreenVideo={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
