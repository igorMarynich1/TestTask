const path = require('path');

module.exports = {
  expo: {
    name: 'React Native Test App',
    slug: 'react-native-test-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: path.resolve(__dirname, 'assets/icon.png'),
    userInterfaceStyle: 'light',
    splash: {
      image: path.resolve(__dirname, 'assets/splash.png'),
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.react-native-test-app',
    },
    plugins: [],
    android: {
      adaptiveIcon: {
        foregroundImage: path.resolve(__dirname, 'assets/adaptive-icon.png'),
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: path.resolve(__dirname, 'assets/favicon.png'),
    },
  },
};
