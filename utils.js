export const resolveBrowserLocale = (defaultLocale = 'en') => {
  const {
    language,
    browserLanguage,
    userLanguage,
  } = window.navigator;
  return (language || browserLanguage || userLanguage || defaultLocale).split(
      '-'
  )[0];
};


const urlLocaleRegExp = new RegExp('^\\/([^\\/]+)\\/?');
export const getLocaleFromUrl = (locales = []) => {
  const path = window.location.pathname;
  const result  = urlLocaleRegExp.exec(path);
  const urlLocale = result && result[1];
  if (!urlLocale) return '';
  if (locales.includes(urlLocale)) return urlLocale;
  return '';
}
