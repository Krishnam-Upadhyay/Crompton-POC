import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BaseText from '../../components/BaseText/BaseText';
import images from '../../globals/images';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../globals/colors';
import {
  checkDebugMode,
  checkInternetConnectivity,
  checkIsEmulator,
  checkRooted,
} from './SplashUtils';
import Styles from './Styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {setBottomSheetDisable} from '../../redux/features/Slices/bottomSheetViewSlice';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {RESULTS, requestNotifications} from 'react-native-permissions';

const height = Dimensions.get('window').height - 100;
const width = Dimensions.get('window').width;

const SplashScreen1 = () => {
  const [errorString, setErrorString] = useState<string | null>(null);
  const [gifSource, setGifSource] = useState(images.logoGif);
  const dispatch = useDispatch();
  console.log('errorString: ', errorString);
  const navigation = useNavigation<any>();
  const isIos = () => Platform.OS === 'ios';
  const isAndroid = () => Platform.OS === 'android';
  const getPlatformVersion = () => Number(Platform.Version);

  useFocusEffect(
    useCallback(() => {
      console.log('FROMM HERE useFocusEffect');

      const timer = setTimeout(() => {
        setGifSource(images.splash1Static); // Replace with your static frame URL
      }, 5000); // Pauses after 3 seconds

      // //Clear home screen bottom sheet
      dispatch(setBottomSheetDisable());
      appStartup(); // Refresh when screen is focused

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }, []),
  );

  const appStartup = useCallback(async () => {
    /*     const isRooted = checkRooted();
    if (isRooted) {
      setErrorString('Your device is rooted,\n You cannot go further.');
      // setIsLoading(false);
      // await sleep1();
      return;
    } */
    // #endregion

    // #region check debug mode
    /*  const isDebugMode = await checkDebugMode();
    if (isDebugMode) {
      setErrorString(
        'Your device is running in debug mode,\n You cannot go further.',
      );
      // setIsLoading(false);
      // await sleep1();
      return;
    } */
    // #endregion

    // #region check emulator
    /*     const isEmulator = await checkIsEmulator();
    if (isEmulator) {
      setErrorString(
        'Your application is running on Emulator,\n You cannot go further.',
      );
      // setIsLoading(false);
      // await sleep1();
      return;
    } */
    // #endregion

    // #region check internet connectivity
    // setStatusString('Checking Internet Connection...');
    // await sleep1();
    const isNetworkConnected = await checkInternetConnectivity();
    if (!isNetworkConnected.isConnected) {
      setErrorString('Please check your internet connection\n and try again.');
      // setIsLoading(false);
      // await sleep1();
      return;
    }
    // #endregion

    // const checkNotiPermission = await checkNotificationPermission();
    // console.log('checkNotiPermission: ', checkNotiPermission);
    // if (checkNotiPermission) {
    //   setErrorString('Please allow notification to receive notification');
    //   setIsLoading(false);
    //   Alert.alert(
    //     'Alert!',
    //     'Please allow notification to receive notification',
    //     [
    //       {
    //         text: 'OK',
    //         style: 'destructive',
    //         onPress: async () => {
    //           // if (errorString.toLowerCase().includes('notification')) {
    //           console.log('openNotificationSettings');
    //           await notifee.openNotificationSettings();
    //           // }
    //         },
    //       },
    //     ],
    //   );
    //   await sleep1();
    //   return;
    // }

    // await checkAndRequestPermission();
    let notiPermission = await notificationFunction();

    console.log('notiPermission: ', notiPermission);

    /*  console.log(
      'PERMISSION: ',
      !isRooted &&
        !isDebugMode &&
        !isEmulator &&
        isNetworkConnected.isConnected &&
        notiPermission,
    ); */

    const timer = setTimeout(() => {
      if (
        /*  !isRooted &&
        !isDebugMode &&
        !isEmulator && */
        isNetworkConnected.isConnected &&
        notiPermission
      ) {
        navigation.navigate('SplashContainer');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const notificationFunction = () => {
    return new Promise(resolve => {
      let notiPermission = false;
      if (isIos() || (isAndroid() && getPlatformVersion() >= 33)) {
        requestNotificationsPermission(
          () => {
            //notification granted tasks
            notiPermission = true;
            resolve(notiPermission);
          },
          () => {
            //notification denied tasks
            notiPermission = true;
            resolve(notiPermission);
          },
        );
      } else {
        notiPermission = true;
        resolve(notiPermission);
      }
    });
  };

  async function checkAndRequestPermission() {
    // Check if permission has already been granted
    const authorizationStatus = await messaging().hasPermission();

    if (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Notification permission is already granted.');
      // You can retrieve the token here if needed
      const token = await messaging().getToken();
      console.log('Device token:', token);
    } else {
      console.log(
        'Notification permission is not granted. Requesting permission...',
      );
      await requestUserPermission();
    }
  }

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('Permission granted.');
        const token = await messaging().getToken();
        console.log('Device token:', token);
      } else {
        console.log('Permission denied.');
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
    }
  }

  const requestNotificationsPermission = (
    onGranted: () => void,
    onBlocked: () => void,
  ) => {
    let noti = false;
    requestNotifications(['alert', 'sound', 'badge']).then(({status}) => {
      if (status === RESULTS.GRANTED) {
        // noti = true;
        onGranted();
      } else {
        // noti = true;
        onBlocked();
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.whiteColor,
      }}>
      <FastImage
        source={gifSource}
        style={{height: height, width: width}}
        resizeMode={Platform.OS == 'ios' ? 'contain' : 'center'}
      />
      {errorString && (
        <View style={{flex: 1}}>
          <View style={Styles.errorViewContainer}>
            <View style={Styles.errorView}>
              <FontAwesomeIcon
                name="warning"
                size={30}
                color={colors.RedColor}
                style={Styles.errorIcon}
              />
              <BaseText style={Styles.errorText}>{errorString}</BaseText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SplashScreen1;
