import useLocale from './useLocale';

const usePath = () => {
  const locale = useLocale();
  return (path) => {
    if (!path || path === '/') {
      return `/${locale}`;
    }
    return path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
  }
}

export default usePath;