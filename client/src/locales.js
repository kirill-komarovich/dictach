import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ru from 'react-intl/locale-data/ru';
// import messages_ru from './translations/ru.json';
import messages_en from './translations/en.json';

const DEFAULT_LOCALE = 'en';

addLocaleData([...locale_en, ...locale_ru]);

const messages = {
  // 'ru': messages_ru,
  'en': messages_en
};


const setLocale = () => {
  const systemLocale = navigator.language.split(/[-_]/)[0];
  const supportedLocales = Object.keys(messages);

  return supportedLocales.includes(systemLocale) ? systemLocale : DEFAULT_LOCALE;
};

export {
  messages,
  setLocale,
};
