import {Storage} from 'redux-persist';
import {MMKVStorage, storage} from './MMKVStorage';
import {Decrypt, Encrypt} from '../../Helpers/Crypto/Crypto';

// TODO: Add Encryption logic in mmkv, as it is removed due to lib issue

export const reduxMMKVStorage: Storage = {
  setItem: (key, value) => {
    // let fnlData = value;
    // console.log("setValue: ", value)
    if (value) {
      let fnlData = Encrypt(value);
    // console.log("setItem key: ", key)
    // console.log("setItem fnlData: ", fnlData)

    MMKVStorage.set(key, fnlData);
  }
    return Promise.resolve(true);
  },
  getItem: key => {
    // console.log('getItem key: ', key);
    const value = MMKVStorage.getString(key);
    // console.log("getItem value: ", value)
    let fnlData = value;
    if (value) {
      fnlData = Decrypt(value);
    }
    // console.log("getItem fnlData: ", fnlData)
    return Promise.resolve(fnlData);
  },
  removeItem: key => {
    // console.log('removeItem key: ', key);
    MMKVStorage.delete(key);
    return Promise.resolve();
  },
};
