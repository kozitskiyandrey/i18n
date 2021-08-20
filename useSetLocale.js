import {useContext, useCallback} from 'react';
import TranslationContext from './TranslationContext';

const useSetLocale = () => {
  const {setLocale} = useContext(TranslationContext);
  return useCallback((newLocale) => setLocale(newLocale), [setLocale]);
};

export default useSetLocale;
