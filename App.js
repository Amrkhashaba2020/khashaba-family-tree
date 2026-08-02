import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
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

  // Handles messages posted from the web page inside the WebView,
  // used here to receive a generated PDF (base64) and share it natively.
  const handleWebViewMessage = useCallback(async (event) => {
    let msg;
    try {
      msg = JSON.parse(event.nativeEvent.data);
    } catch (e) {
      return;
    }

    if (msg && msg.type === 'sharePdf' && msg.data) {
      try {
        const fileName = msg.filename || 'book.pdf';
        const fileUri = FileSystem.cacheDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, msg.data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'application/pdf',
            dialogTitle: 'مشاركة الكتاب',
            UTI: 'com.adobe.pdf',
          });
        }
      } catch (e) {
        // Sharing failed or was cancelled; nothing else to do here.
      }
    }
  }, []);

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
        onMessage={handleWebViewMessage}
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
