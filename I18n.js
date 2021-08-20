const r = new RegExp('%\\{([^\\}]*)\\}', 'gi');

function localesFromDictionaries(dictionaries) {
  return typeof dictionaries === 'object' && dictionaries !== null
    ? Object.keys(dictionaries)
    : []
}

class I18n {
  #_locale = 'en';
  #_locales = [];
  #_dictionaries = {};
  #_defaultLocale = 'en';
  #_config = {};

  constructor({
    locale = '',
    defaultLocale = 'en',
    dictionaries = {},
    logLevel = 'warn',
    localeChain = [],
  } = {}) {
    this.#_locales = localesFromDictionaries(dictionaries);
    this.#_dictionaries = dictionaries;
    this.#_defaultLocale = defaultLocale;
    this.#_config = {
      logLevel,
      localeChain,
    };

    this.#_defaultLocale = this.hasLocale(defaultLocale) ? defaultLocale : 'en';

    if (this.hasLocale(locale)) {
      this.locale = locale;
    } else {
      this.locale = this.#_defaultLocale;
    }
  }

  get locale() {
    return this.#_locale;
  }

  set locale(newLocale) {
    const locales = this.#_locales;
    if (newLocale && locales.includes(newLocale)) {
      this.#_locale = newLocale;
    }
  }

  get locales() {
    return this.#_locales;
  }

  hasLocale(locale) {
    const locales = this.#_locales;
    return locales.includes(locale) ? true : false;
  }

  log(message) {
    const logLevel = this.#_config.logLevel;
    if (logLevel === 'error') {
      console.error(message);
    } else if (logLevel === 'warn') {
      console.warn(message);
    } else if (logLevel === 'log') {
      console.log(message);
    }
  }

  replace(str, arg) {
    const self = this;
    if (typeof str !== 'string') {
      this.log(`i18n: argument not string`);
      return '';
    }
    return str.replace(r, function (m, $1) {
      if (!arg || !arg.hasOwnProperty($1)) {
        self.log(`i18n: missing arg - ${$1} in phrase ${str}`);
        return m;
      }
      return arg[$1];
    });
  }

  findKey(key) {
    const dictionaries = this.#_dictionaries;
    const defaultLocale = this.#_defaultLocale;
    const localeChain = this.#_config.localeChain;

    let result = '';
    if (!localeChain || !Array.isArray(localeChain)) {
      return result;
    }

    localeChain.some((chainValue) => {
      if (chainValue && dictionaries[chainValue] && dictionaries[chainValue][key]) {
        result = dictionaries[chainValue][key];
        return true;
      }
      if (chainValue === 'default' && dictionaries[defaultLocale] && dictionaries[defaultLocale][key]) {
        result = dictionaries[defaultLocale][key];
        return true;
      }
      if (chainValue === 'key') {
        result = key;
        return true;
      }
      return false;
    });

    return result;
  }

  translate = (key, args) => {
    let phrase = '';
    const locale = this.#_locale;
    const messages = this.#_dictionaries[locale];

    const hasPhrase = messages.hasOwnProperty(key);
    if (!hasPhrase) {
      this.log(`i18n: not found key "${key}" in locale "${locale}"`);
      phrase = this.findKey(key);
    } else {
      phrase = messages[key];
    }

    if (phrase) {
      phrase = this.replace(phrase, args);
    }
    return phrase;
  };
}

export default I18n;
