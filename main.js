import I18n from './I18n';
import TranslationProvider from './TranslationProvider';
import useTranslate from './useTranslate';
import useLocale from './useLocale';
import useLocales from './useLocales';
import useSetLocale from './useSetLocale';
import withTranslate from './withTranslate';
import usePath from './usePath';
import * as utils from './utils';

const dic = {
  en: {
    test: 'Test %{min}'
  },
  ru: {
    test: 'Тест %{min}'
  },
  es: {
    // test: 'dwdwd %{min}'
  }
}

const i18n = new I18n({
  dictionaries: dic,
  defaultLocale: 'en',
  locale: 'es',
  logLevel: 'warn',
  localeChain: ['ru', 'default', 'key'],
});

const _t = (key, args) => {
  return i18n.translate(key, args);
};

export {
  TranslationProvider,
  withTranslate,
  useTranslate,
  useLocale,
  useLocales,
  useSetLocale,
  usePath,
  utils,
  _t,
}

export default i18n;
