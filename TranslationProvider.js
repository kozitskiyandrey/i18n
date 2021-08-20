import React, {useState, useCallback, useMemo, Children} from 'react';

import TranslationContext from './TranslationContext';

const TranslationProvider = ({children, provider: i18nProvider}) => {
  if (!i18nProvider) {
    throw new Error('i18n: provider not found');
  }
  const [state, setState] = useState({
    locale: i18nProvider.locale || 'en',
    locales: i18nProvider.locales || ['en'],
    i18nProvider,
  });

  const setLocale = useCallback(
    (newLocale) => {
      console.log('newLocale',newLocale);

      const prev = i18nProvider.locale;
      console.log('prev', prev);

      if (prev === newLocale) {
        return;
      }
      i18nProvider.locale = newLocale;
      setState({
        locales: i18nProvider.locales,
        locale: i18nProvider.locale,
        i18nProvider,
      });
    },
    [setState, i18nProvider],
  );

  console.log('state', state);

  const value = useMemo(() => {
    return {
      ...state,
      setLocale,
    };
  }, [setLocale, state]);

  return (
    <TranslationContext.Provider value={value}>
      {typeof children === 'function'
        ? children(value)
        : Children.only(children)}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
