/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable promise/prefer-await-to-then */
import asyncStorageLib from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

type GetDataType = { [key: string]: any };

const setItem = async (key: string, value: string) =>
  asyncStorageLib.setItem(key, value);

const getItem = (key: string) => asyncStorageLib.getItem(key);

const setData = (key: string, data: object) =>
  new Promise((resolve, reject) => {
    try {
      const value = JSON.stringify(data);
      asyncStorageLib.setItem(key, value).then(resolve).catch(reject);
    } catch (e) {
      reject(e);
    }
  });

const getData = (key: string): GetDataType =>
  new Promise((resolve, reject) => {
    asyncStorageLib
      .getItem(key)
      .then(value => {
        try {
          const data: GetDataType = value ? JSON.parse(value) : null;

          return resolve(data);
        } catch (e) {
          return reject(e);
        }
      })
      .catch(reject);
  });

const setSecureItem = async (key: string, value: string) =>
  EncryptedStorage.setItem(key, value);

const getSecureItem = (key: string) => EncryptedStorage.getItem(key);

const setSecureData = (key: string, data: object) =>
  new Promise((resolve, reject) => {
    try {
      const value = JSON.stringify(data);
      EncryptedStorage.setItem(key, value).then(resolve).catch(reject);
    } catch (e) {
      reject(e);
    }
  });

const getSecureData = (key: string): GetDataType =>
  new Promise((resolve, reject) => {
    EncryptedStorage.getItem(key)
      .then(value => {
        try {
          const data: GetDataType = value ? JSON.parse(value) : null;

          return resolve(data);
        } catch (e) {
          return reject(e);
        }
      })
      .catch(reject);
  });

const clearSecureStorage = () => EncryptedStorage.clear();

export const storage = {
  setItem,
  getItem,
  setData,
  getData,
};

export const secureStorage = {
  setItem: setSecureItem,
  getItem: getSecureItem,
  setData: setSecureData,
  getData: getSecureData,
  clear: clearSecureStorage,
};
