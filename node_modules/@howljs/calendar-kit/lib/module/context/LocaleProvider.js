import merge from 'lodash.merge';
import React, { useMemo } from 'react';
import { DEFAULT_LOCALES } from '../constants';
import useLazyRef from '../hooks/useLazyRef';
const LocaleContext = /*#__PURE__*/React.createContext(undefined);
const LocaleProvider = ({
  initialLocales,
  locale = 'en',
  children
}) => {
  const locales = useLazyRef(() => merge({}, DEFAULT_LOCALES, initialLocales));
  const localeConfig = useMemo(() => locales.current[locale] || locales.current.en, [locale, locales]);
  return /*#__PURE__*/React.createElement(LocaleContext.Provider, {
    value: localeConfig
  }, children);
};
export default LocaleProvider;
export const useLocale = () => {
  const locale = React.useContext(LocaleContext);
  if (!locale) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return locale;
};
//# sourceMappingURL=LocaleProvider.js.map