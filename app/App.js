import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import * as Font from 'expo-font';
if (__DEV__) {
  import('./src/config/reactotron');
}

import Routes from './src/routes';
import store from './src/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          GreatVibes_400Regular,
          Ubuntu_300Light,
          Ubuntu_400Regular,
          Ubuntu_500Medium,
          Ubuntu_700Bold,
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setIsAppReady(true);
      }
    }
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#FDB02F" />
          <Routes />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});