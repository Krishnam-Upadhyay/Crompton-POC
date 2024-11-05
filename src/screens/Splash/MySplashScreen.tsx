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

  const refreshScreen = () => {
    // Your logic to refresh the screen (e.g., fetching data or resetting state)
    console.log('Screen refreshed');
  };

  useFocusEffect(
    useCallback(() => {
      console.log('FROMM HERE useFocusEffect');
      appStartup(); // Refresh when screen is focused
    }, []),
  );

  // useEffect(() => {
  // console.log('navigation.isFocused(): ', navigation.isFocused());
  // console.log('azureAdError: ', azureAdError);
  // console.log(
  // '!azureAdError && navigation.isFocused(): ',
  // !azureAdError && navigation.isFocused(),
  // );
  // setTimeout(() => {
  // if (!azureAdError && navigation.isFocused()) {
  // const appStateListener = AppState.addEventListener(
  // 'change',
  // nextAppState => {
  // console.log('appState: ', appState);
  // console.log('nextAppState: ', nextAppState);
  // if (
  // appState.match(/inactive|active/) &&
  // nextAppState === 'active'
  // ) {
  // console.log('dsaasds');
  // appStartup(); // Refresh when app comes to foreground
  // }
  // setAppState(nextAppState);
  // },
  // );

  // return () => {
  // appStateListener.remove(); // Clean up listener on component unmount
  // };
  // }
  // }, 5000);
  // }, [appState, azureAdError]);

  const appStartup = useCallback(async () => {
    // const isRooted = checkRooted();
    // if (isRooted) {
    // setErrorString('Your device is rooted,\n You cannot go further.');
    // setIsLoading(false);
    // await sleep1();
    // return;
    // }
    // // #endregion

    // // #region check debug mode
    // const isDebugMode = await checkDebugMode();
    // if (isDebugMode) {
    // setErrorString(
    // 'Your device is running in debug mode,\n You cannot go further.',
    // );
    // setIsLoading(false);
    // await sleep1();
    // return;
    // }
    // // #endregion

    // // #region check emulator
    // const isEmulator = await checkIsEmulator();
    // if (isEmulator) {
    // setErrorString(
    // 'Your application is running on Emulator,\n You cannot go further.',
    // );
    // setIsLoading(false);
    // await sleep1();
    // return;
    // }
    // // #endregion

    // // #region check internet connectivity
    // setStatusString('Checking Internet Connection...');
    // await sleep1();
    // const isNetworkConnected = await checkInternetConnectivity();
    // if (!isNetworkConnected.isConnected) {
    // setErrorString('Please check your internet connection\n and try again.');
    // setIsLoading(false);
    // await sleep1();
    // return;
    // }
    // // #endregion

    // // const checkNotiPermission = await checkNotificationPermission();
    // // console.log('checkNotiPermission: ', checkNotiPermission);
    // // if (checkNotiPermission) {
    // // setErrorString('Please allow notification to receive notification');
    // // setIsLoading(false);
    // // Alert.alert(
    // // 'Alert!',
    // // 'Please allow notification to receive notification',
    // // [
    // // {
    // // text: 'OK',
    // // style: 'destructive',
    // // onPress: async () => {
    // // // if (errorString.toLowerCase().includes('notification')) {
    // // console.log('openNotificationSettings');
    // // await notifee.openNotificationSettings();
    // // // }
    // // },
    // // },
    // // ],
    // // );
    // // await sleep1();
    // // return;
    // // }

    // console.log(
    // 'PERMISSION: ',
    // !isRooted &&
    // !isDebugMode &&
    // !isEmulator &&
    // isNetworkConnected.isConnected,
    // // !checkNotiPermission,
    // );

    // //Clear home screen bottom sheet
    // dispatch(setBottomSheetDisable());

    // if (
    // !isRooted &&
    // !isDebugMode &&
    // !isEmulator &&
    // isNetworkConnected.isConnected
    // // !checkNotiPermission
    // ) {
    // await callInitialFunction();
    // } else {
    // }

    await callInitialFunction();
  }, []);

  // useEffect(() => {
  // appStartup();
  // // logoutUser();
  // // checkNotificationPermission();
  // // callInitialFunction();
  // // checkMmkvData()
  // // callMasterData()
  // // callUserAuthApi('epm1@prosaressolutions.onmicrosoft.com');
  // }, []);

  // useEffect(() => {
  // if (errorString) {
  // callAlertFunc();
  // }
  // }, [errorString]);

  // const callAlertFunc = async () => {
  // Alert.alert('Alert!', errorString, [
  // {
  // text: 'OK',
  // style: 'destructive',
  // onPress: async () => {
  // if (errorString.toLowerCase().includes('notification')) {
  // await notifee.openNotificationSettings();
  // }
  // },
  // },
  // ]);
  // };

  async function checkNotificationPermission() {
    if (Platform.OS == 'android') {
      const settings = await notifee.getNotificationSettings();

      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permissions has been authorized');
        return false;
      } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
        console.log('Notification permissions has been denied');
        return true;
      }
    } else {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission settings:', settings);
      } else {
        console.log('User declined permissions');
        await notifee.requestPermission({
          sound: false,
          announcement: true,
          inAppNotificationSettings: false,
          // ... other permission settings
        });
      }
    }
    console.log('ADasas');
  }

  const getFcmToken = async () => {
    // Get the token
    const token = await messaging().getToken();

    console.log('FCM token: ', token);
    log.info(`FCM token: ${token}`);

    return token || '';
  };

  const callMasterData = async () => {
    try {
      log.info('Inside callMasterData');
      const respData = await ApiCall(API.GetMasterData);
      console.log('respData: ', respData);
      if (respData && respData.message.toLowerCase() == 'ok' && respData.data) {
        console.log('callMasterData: ', respData.data);
        dispatch(setMasterData(respData.data));

        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error from master data');
      }
    } catch (err) {
      console.log('Error from callMasterData: ');
    } finally {
      dispatch(setGlobalLoaderDisable());
    }
  };

  const callUserAuthApi = async (userId = '', OverrideSession = false) => {
    console.log('Inside callUserAuthApi');
    log.info('Inside callUserAuthApi');
    dispatch(setGlobalLoaderEnable());
    const fcmToken = await getFcmToken();
    try {
      const inputParam = JSON.stringify({
        LoginId: userId,
        OSVersion: Platform.Version.toString(),
        DeviceId: DeviceInfo.getDeviceId(),
        PlatformType: Platform.OS,
        Model: DeviceInfo.getModel(),
        FCMToken: fcmToken,
        OverrideSession: OverrideSession,
      });
      const result = await ApiCall(API.AuthorizeUser, inputParam);
      console.log('AuthorizeUser result: ', result);
      log.info('callUserAuthApi result: ', JSON.stringify(result));
      if (result && result.message.toLowerCase() == 'ok' && result.data) {
        // console.log('result: ', result.data);
        dispatch(setUserData(result.data));

        storage.setItem(StorageKeys.TOKEN, result?.data?.Token);
        storage.setItem(StorageKeys.USER_ID, result?.data?.UserId?.toString());

        await callMasterData();
      } else if (
        result &&
        result.message.toLowerCase().includes('already exists')
      ) {
        Alert.alert(
          'User Already Logged In',
          'If you want to loggin from this device then click on OK button',
          [
            {
              text: 'Cancel',
              style: 'destructive',
              onPress: () => {
                dispatch(setGlobalLoaderDisable());
              },
            },
            {
              text: 'OK',
              style: 'cancel',
              onPress: async () => {
                await callUserAuthApi(userId, true);
              },
            },
          ],
        );
      } else if (
        result &&
        result.message.toLowerCase().includes('user does not exist')
      ) {
        dispatch(setGlobalLoaderDisable());
        Alert.alert('Alert', 'User does not exist. Please try again', [
          {
            text: 'OK',
            style: 'cancel',
            onPress: async () => {
              await callAzureLogin();
            },
          },
        ]);
      } else {
        if (result.message) {
          Alert.alert('Alert', result.message);
        }
      }
    } catch (err) {
      console.log('err12: ', JSON.stringify(err));
      dispatch(setGlobalLoaderDisable());
    } finally {
      dispatch(setGlobalLoaderDisable());
    }
  };

  const checkMmkvData = () => {
    let checkDataIsExists = storage.storageKeys;
    console.log('checkDataIsExists: ', checkDataIsExists);
    const checkName = storage.getItem('persist:root');
    console.log('checkName: ', !checkName?.azureAd?.azureAdDataRedux);
    // if(!checkName){
    // storage.setItem(StorageKeys.NAME,"Shashank")
    // }
  };

  // console.log('azureAdData: ', azureAdData);
  // console.log('userData: ', userData);
  // console.log('LOGIN CONDITIONS: ', userData != null);
  // console.log('navigation : ', navigation);

  const callInitialFunction = async () => {
    console.log('azureAdData: ', azureAdData);
    console.log('userData: ', userData);
    if (!errorString) {
      if (
        azureAdData != null &&
        azureAdData?.expireOn &&
        azureAdData.expireOn &&
        userData &&
        userData != null &&
        Object.keys(userData).length > 0
      ) {
        const expireTime = moment(parseInt(azureAdData.expireOn));

        if (expireTime.isValid() && expireTime.isBefore(moment())) {
          let isAuthenticated = await updateTokenIfExpired(
            azureAdData,
            dispatch,
          );
          if (isAuthenticated) {
            setTimeout(() => {
              navigation.navigate('HomeScreen');
            }, 2000);
          }
        } else {
          //navigation.navigate('HomeScreen');
          setTimeout(() => {
            navigation.navigate('HomeScreen');
          }, 2000);
        }
      } else {
        console.log('demo page');
        setTimeout(async () => {
          await callAzureLogin();
        }, 2000);

        // navigation.navigate('LoginScreen');
      }
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
        await callUserAuthApi(authResult.userId);
        // console.log('Auth Result:', userData);
      } else {
        Alert.alert('Failed to login with Azure Ad');
      }
    } catch (error: any) {
      console.log('Error during login:', error);
      log.info('Azure error: ', JSON.stringify(error));
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

  const imagesArray = [
    images.logo_lable_A,
    images.logo_lable_L,
    images.logo_lable_E,
    images.logo_lable_R,
    images.logo_lable_T,
  ];
  const animations = useRef(
    imagesArray.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animationsSequence = animations.map((animation, index) =>
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        delay: index * 100, // Adjust delay for each image
        useNativeDriver: true,
      }),
    );

    Animated.stagger(300, animationsSequence).start();
  }, [animations]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}>
        <Image source={images.logo} style={styles.img} />
        <View style={styles.groupImage}>
          {imagesArray.map((image, index) => (
            <Animated.Image
              key={index}
              source={image}
              resizeMode={'contain'}
              style={[
                styles.alertImage,
                {
                  opacity: animations[index],
                  transform: [
                    {
                      translateY: animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0], // Move from 20 pixels below
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
export default MySplashScreen;
