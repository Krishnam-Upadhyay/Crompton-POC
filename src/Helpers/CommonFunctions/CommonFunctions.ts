
import AzureAuthConfig from '../../config/AzureAuthConfig';
import {persistor, store} from '../../redux/store';
import {storage} from '../../utils/storage/MMKVStorage';
import {globalNavigation} from '../../navigators/navigationServices';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';

import {StorageKeys} from '../../utils/storage/StorageKeys';

import {clearAuthData} from '../../redux/features/Slices/azureAdDataSlice';




export const logoutUser = async () => {
  console.log('Logging out user');
  try {
    const userId = storage.getItem(StorageKeys.USER_ID);
    console.log('userId: ', userId);
    store.dispatch(setGlobalLoaderEnable());
  
    storage.clear();
    await persistor.purge();
    await persistor.flush();
    store.dispatch(clearAuthData());
    await new Promise(resolve => setTimeout(resolve, 100));
    const timer = setTimeout(async () => {
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
    }, 200);
    return () => clearTimeout(timer);
  } catch (err) {
    console.log('error in logout');
    store.dispatch(setGlobalLoaderDisable());
  }
};
