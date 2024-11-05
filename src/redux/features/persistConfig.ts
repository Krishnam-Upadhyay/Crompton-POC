import {persistReducer} from 'redux-persist';
import {reduxMMKVStorage} from '../../utils/storage/MMKVReduxStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '.';

export const persistConfig = {
  version: 0,
  key: 'root',
  // storage: AsyncStorage,
  storage: reduxMMKVStorage,
  whitelist: [
    'theme',
    'user',
    'azureAd',
    'userData',
    'masterData',
    'notificationCount',
  ], // specify which slices to persist
  //whitelist: persistWhitelist,
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
