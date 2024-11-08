import React, {useCallback, useEffect, useState} from 'react';

import {
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import BootSplash from 'react-native-bootsplash';

import AppNavigator from './src/navigators/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider} from '@gorhom/portal';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {directoryPath, log} from './src/Helpers/CommonFunctions/FileLogger';
import RNFS from 'react-native-fs';
import RNScreenshotPrevent from 'react-native-screenshot-prevent';
import Config from 'react-native-config';

const App = () => {
  if (!__DEV__) {
    console.log = () => {}; // Disable console.log
    console.warn = () => {}; // Disable console.warn
    console.error = () => {}; // Disable console.error
  }

  useEffect(() => {
    const init = async () => {
      await BootSplash.hide({fade: true});
    };

    init();
    createLogsFile();
    onAppBootstrap();
  }, []);

  const createLogsFile = () => {
    try {
      RNFS.exists(directoryPath + '/logs').then(result => {
        //  console.log('here');
        if (result) {
          //  console.log('here111');
          log.info('App Intializing');
        } else {
          // console.log('here222');
          RNFS.mkdir(directoryPath + '/logs').then(res => {
            // console.log('here333');
            // console.log(res);
            log.info('App Intializing');
          });
        }
      });
    } catch (err) {
      //console.log(err);
      log.error(err);
    }
  };

  async function onAppBootstrap() {
    // console.log('Inside onAppBootstrap');
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
  }

  useEffect(() => {
    configureScreenshotPrevent();
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const configureScreenshotPrevent = useCallback(() => {
    /* (IOS, Android) for android might be the only step to get secureView
     * on IOS enables blurry view when app goes into inactive state
     */
    RNScreenshotPrevent.enabled(__DEV__ ? false : true);

    /* (IOS) enableSecureView for IOS13+
     * creates a hidden secureTextField which prevents Application UI capture on screenshots
     */
    if (!__DEV__) {
      RNScreenshotPrevent.enableSecureView();
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <PortalProvider>
              <SafeAreaView style={{flex: 1}}>
                <AppNavigator />
              </SafeAreaView>
            </PortalProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'red',
    flex: 1,
  },
});

export default App;
