import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { TREE_HTML } from './treeHtml';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f4ecd4" barStyle="dark-content" />
      <WebView
        originWhitelist={['*']}
        source={{ html: TREE_HTML }}
        style={styles.webview}
        // allow pinch zoom for reading long name lists comfortably
        scalesPageToFit={Platform.OS === 'android'}
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ecd4',
  },
  webview: {
    flex: 1,
    backgroundColor: '#f4ecd4',
  },
});
