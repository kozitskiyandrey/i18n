import {useContext, useCallback} from 'react';
import TranslationContext from './TranslationContext';

const identity = (key) => key;

const useTranslate = () => {
  const {i18nProvider} = useContext(TranslationContext);
  const translate = useCallback(
    (key, options) => {
      return i18nProvider.translate(key, options);
    },
    [i18nProvider],
  );
  return i18nProvider ? translate : identity;
};

export default useTranslate;
