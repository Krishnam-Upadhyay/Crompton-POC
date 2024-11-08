import {
  ActivityIndicator,
  Alert,
  Animated,
  AppState,
  Easing,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import styles from './Styles';
import images from '../../globals/images';
import AzureAuthConfig from '../../config/AzureAuthConfig';

import {useCallback, useEffect, useRef, useState} from 'react';
import {
  checkDebugMode,
  checkInternetConnectivity,
  checkIsEmulator,
  checkRooted,
} from './SplashUtils';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {Screen} from 'react-native-screens';
import {useDispatch, useSelector} from 'react-redux';
import {azureAuthData, userDetails} from '../../redux/selectors/selectors';
import moment from 'moment';
import {updateTokenIfExpired} from '../../Helpers/AzureAuth/AzureAuth';
import {setAuthData} from '../../redux/features/Slices/azureAdDataSlice';
import {storage} from '../../utils/storage/MMKVStorage';
import {StorageKeys} from '../../utils/storage/StorageKeys';
import {setBottomSheetDisable} from '../../redux/features/Slices/bottomSheetViewSlice';
import {ApiCall} from '../../Helpers/Network/ApiCall';
import API from '../../globals/API';
import axios from 'axios';
import {setUserData} from '../../redux/features/Slices/userDetails';
import {setMasterData} from '../../redux/features/Slices/masterDataSlice';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {log} from '../../Helpers/CommonFunctions/FileLogger';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {logoutUser} from '../../Helpers/CommonFunctions/CommonFunctions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../globals/colors';
import BaseText from '../../components/BaseText/BaseText';

const MySplashScreen = () => {
  const [errorString, setErrorString] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusString, setStatusString] = useState(
    'Initializing App, \nPlease Wait...',
  );
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const [azureAdError, setAzureAdError] = useState(false);
  const dispatch = useDispatch();
  const azureAdData = useSelector(azureAuthData);
  const userData = useSelector(userDetails);

  const isFocused = useIsFocused();

  // console.log('appState: ', appState);

  const sleep1 = async () => {
    //await sleep(5000);
  };

  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      /*  console.log('FROMM HERE useFocusEffect'); */
      appStartup();
      // Refresh when screen is focused
    }, []),
  );

  const appStartup = useCallback(async () => {
    const isNetworkConnected = await checkInternetConnectivity();
    if (!isNetworkConnected.isConnected) {
      setErrorString('Please check your internet connection\n and try again.');

      return;
    } else {
      await callInitialFunction();
    }
  }, []);

  const callInitialFunction = async () => {
    console.log('azureAdData: ', azureAdData);

    if (azureAdData) {
      navigation.navigate('HomeScreen');
      navigation.reset({
        index: 0, // This is the index of the new route in the stack
        routes: [{name: 'HomeScreen'}], // New screen to navigate to
      });
    } else {
      await callAzureLogin();
    }
  };

  const callAzureLogin = async () => {
    try {
      log.info('Before azure ad');
      const authResult = await AzureAuthConfig.webAuth.authorize({
        scope: 'openid profile User.Read Mail.Read',
      });
      // console.log("authResult: ", authResult)
      if (authResult) {
        const userData = {
          accessToken: authResult.accessToken,
          expireOn: authResult.expireOn,
          userId: authResult.userId,
          userName: authResult.userName,
        };
        log.info('Azure userData: ', JSON.stringify(userData));
        dispatch(setAuthData(userData));
        storage.setItem(StorageKeys.USER_ID, authResult.userId?.toString());
        navigation.navigate('HomeScreen');
        navigation.reset({
          index: 0, // This is the index of the new route in the stack
          routes: [{name: 'HomeScreen'}], // New screen to navigate to
        });
        // await callUserAuthApi(authResult.userId);
        // console.log('Auth Result:', userData);
      } else {
        Alert.alert('Failed to login with Azure Ad');
      }
    } catch (error: any) {
      /*       console.log('Error during login:', error);
      log.info('Azure error: ', JSON.stringify(error)); */
      if (
        error &&
        (error?.error_description.toLowerCase().includes('user cancelled') ||
          (error?.length > 0 &&
            error?.[0]?.includes('continue the authentication')))
      ) {
        setAzureAdError(true);
        Alert.alert(
          'Alert!',
          'You cancelled the login process. Please press Ok to proceed with the login',
          [
            {
              text: 'OK',
              style: 'cancel',
              onPress: async () => {
                await appStartup();
                setAzureAdError(false);
              },
            },
          ],
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {errorString && (
        <Text style={{color: 'red', fontWeight: 'bold'}}>{errorString}</Text>
      )}
    </View>
  );
};
export default MySplashScreen;
