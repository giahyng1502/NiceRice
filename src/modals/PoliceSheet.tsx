import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import {useTheme} from '../hooks/useTheme';


const PoliceSheet = () => {
  const {theme} = useTheme();

  const renderLoading = () => (
    <View
      style={[styles.loadingContainer, {backgroundColor: theme.background}]}>
      <ActivityIndicator color={theme.backgroundModal} size="large" />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <WebView
        source={{uri: 'https://devpull.top/nicerice/privacy-policy'}}
        style={{flex: 1}}
        renderLoading={renderLoading}
        javaScriptEnabled={true}
        domStorageEnabled={false}
        originWhitelist={['https://devpull.top']}
        startInLoadingState
        nestedScrollEnabled={true}
        cacheEnabled={false}
        sharedCookiesEnabled={false}
        allowFileAccess={false}
        allowUniversalAccessFromFileURLs={false}
        onShouldStartLoadWithRequest={event => {
          return event.url.startsWith('https://devpull.top');
        }}
        injectedJavaScript={`
          const style = document.createElement('style');
          style.innerHTML = \`
            body {
              background-color: ${theme.background} !important;
              color: ${theme.text2} !important;
            }
            * {
              background: ${theme.background} !important;
            }
          \`;
          document.head.appendChild(style);
          true;
        `}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PoliceSheet;
