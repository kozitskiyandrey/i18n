import React from 'react';
import useTranslate from './useTranslate';
import useLocale from './useLocale';

const withTranslate = (BaseComponent) => {
  const TranslatedComponent = props => {
    const translate = useTranslate();
    const locale = useLocale();
    return (
      <BaseComponent {...props} translate={translate} locale={locale} />
    );
  };

  return TranslatedComponent;
};

export default withTranslate;