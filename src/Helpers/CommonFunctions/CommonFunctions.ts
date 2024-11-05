import {useNavigation} from '@react-navigation/native';
import AzureAuthConfig from '../../config/AzureAuthConfig';
import {persistor, store} from '../../redux/store';
import {storage} from '../../utils/storage/MMKVStorage';
import {globalNavigation} from '../../navigators/navigationServices';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';
import {ApiCall} from '../Network/ApiCall';
import {StorageKeys} from '../../utils/storage/StorageKeys';
import API from '../../globals/API';
import {Alert} from 'react-native';
import {clearAuthData} from '../../redux/features/Slices/azureAdDataSlice';
import {clearUserData} from '../../redux/features/Slices/userDetails';

export const getUserInitials = (fullName: any) => {
  console.log('fullName: ', fullName);
  if (typeof fullName == 'string') {
    const fullNameSplit = fullName?.split(' ');
    const firstName = fullNameSplit?.[0];
    const lastName = fullNameSplit?.[1];

    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    } else if (firstName && !lastName) {
      return `${firstName[0]}`;
    } else if (!firstName && lastName) {
      return `${lastName[0]}`;
    } else if (!firstName && !lastName) {
      return ``;
    }
  } else {
    return '';
  }
};

export const logoutUser = async () => {
  console.log('Logging out user');
  try {
    const userId = storage.getItem(StorageKeys.USER_ID);
    console.log('userId: ', userId);
    store.dispatch(setGlobalLoaderEnable());
    const requestBody = JSON.stringify({
      UserId: userId ? parseInt(userId) : null,
    });
    storage.clear();
    await persistor.purge();
    await persistor.flush();
    store.dispatch(clearAuthData());
    store.dispatch(clearUserData());
    await new Promise(resolve => setTimeout(resolve, 100));
    const timer = setTimeout(async () => {
      const response = await ApiCall(API.Logout, requestBody);
      console.log('Logout response: ', response);
      if (response && response.message.toLowerCase() == 'ok' && response.data) {
        setTimeout(async () => {
          await AzureAuthConfig.webAuth
            .clearSession()
            .then(() => {
              console.log('Logout User');
            })
            .catch(err => {
              console.log('Error clearing session: ', err);
            })
            .finally(() => {
              store.dispatch(setGlobalLoaderDisable());
              globalNavigation('Splash', {fromCommonFunctions: true});
            });
        }, 1000);
      } else {
        store.dispatch(setGlobalLoaderDisable());
        globalNavigation('Splash');
        //Alert.alert('Failed to logout user, please try again later');
      }
    }, 200);
    return () => clearTimeout(timer);
  } catch (err) {
    console.log('error in logout');
    store.dispatch(setGlobalLoaderDisable());
  }
};
