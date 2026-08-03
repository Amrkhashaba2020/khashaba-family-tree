import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import { TREE_HTML } from './treeHtml';

// Keep the native splash screen visible until we explicitly hide it below.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [webviewReady, setWebviewReady] = useState(false);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (webviewReady) {
      hideSplash();
    }
  }, [webviewReady, hideSplash]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f4ecd4" barStyle="dark-content" />
      <WebView
        originWhitelist={['*']}
        source={{ html: TREE_HTML }}
        style={styles.webview}
        scalesPageToFit={Platform.OS === 'android'}
        setSupportMultipleWindows={false}
        onLoadEnd={() => setWebviewReady(true)}
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
