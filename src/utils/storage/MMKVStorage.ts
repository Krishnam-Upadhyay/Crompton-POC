import {MMKV} from 'react-native-mmkv';
import {StorageKeys} from './StorageKeys';
import {Decrypt, Encrypt} from '../../Helpers/Crypto/Crypto';

// TODO: Add Encryption logic in mmkv, as it is removed due to lib issue

export const MMKVStorage = new MMKV({
  id: `shillim-strg`,
  encryptionKey:
    "ShhzUyd34ZWSWgigkj#br!yJhfatSK8Zh7Aj!G6skbG95%HbpR#3UGsH*QJ4^b!R2MNEFz8txsV96H3WURiGDjDW4QwKTi",
});

const setItem = (key: StorageKeys, value: any) => {
  let fnlData = value;
  console.log('setValue: ', value);
  if (value) {
    fnlData = Encrypt(value);
  }
  // console.log('setItem key: ', key);
  // console.log('setItem fnlData: ', fnlData);
  MMKVStorage.set(key, fnlData);
};

const setJSONItem = (key: StorageKeys, value: any) => {
  let fnlData = JSON.stringify(value);
  // console.log('setValue: ', value);
  if (value) {
    fnlData = Encrypt(value);
  }
  // console.log('setItem key: ', key);
  // console.log('setItem fnlData: ', fnlData);
  // const jsonString = JSON.stringify(value);
  MMKVStorage.set(key, fnlData);
};

const getItem = (key: StorageKeys) => {
  // console.log('getItem key: ', key);
  const value = MMKVStorage.getString(key);
  // console.log('getItem value: ', value);
  let fnlData = value;
  if (value) {
    fnlData = Decrypt(value);
  }
  // console.log('getItem fnlData: ', fnlData);
  return fnlData;
};

const getJSONItem = (key: StorageKeys) => {
  // const jsonString = MMKVStorage.getString(key);
  // return jsonString ? JSON.parse(jsonString) : null;
  // console.log('getItem key: ', key);
  const value = MMKVStorage.getString(key);
  // console.log('getItem value: ', value);
  let fnlData = value;
  if (value) {
    fnlData = JSON.parse(Decrypt(value));
  }
  // console.log('getItem fnlData: ', fnlData);
  return fnlData;
};

const removeItem = (key: StorageKeys) => {
  MMKVStorage.delete(key);
};

const clear = () => {
  MMKVStorage.clearAll();
};

const storageKeys = MMKVStorage.getAllKeys();

const storage = {
  setItem,
  setJSONItem,
  getItem,
  getJSONItem,
  removeItem,
  clear,
  storageKeys,
};

export {storage};
