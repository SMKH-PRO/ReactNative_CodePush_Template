/* eslint-disable promise/prefer-await-to-then */
import { i18n as i18nType } from 'i18next';
import { I18nManager } from 'react-native';
import type { LanguageCodes } from '../types';
import { supportedLanguages } from '../constants/translation.constants';

const changeLanguage = (language: LanguageCodes, i18n: i18nType) =>
  new Promise((resolve, reject) => {
    if (supportedLanguages?.[language]) {
      i18n
        .changeLanguage(language)
        .then(() => {
          const isRTL = supportedLanguages[language].rtl;
          I18nManager.forceRTL(isRTL);
          return resolve(true);
        })
        .catch(reject);
    } else {
      reject(new Error('Unknown language'));
    }
  });

export { changeLanguage };
