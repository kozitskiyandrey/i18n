import {useContext} from 'react';
import TranslationContext from './TranslationContext';

const useLocales = () => {
  const {locales} = useContext(TranslationContext);
  return locales;
};

export default useLocales;