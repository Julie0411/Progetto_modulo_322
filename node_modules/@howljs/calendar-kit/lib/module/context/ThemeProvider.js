import merge from 'lodash.merge';
import React, { createContext, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { DEFAULT_THEME } from '../constants';
import useLazyRef from '../hooks/useLazyRef';
import { useSyncExternalStoreWithSelector } from '../hooks/useSyncExternalStoreWithSelector';
import { createStore } from '../storeBuilder';
export const ThemeContext = /*#__PURE__*/createContext(undefined);
const ThemeProvider = ({
  children,
  theme
}) => {
  const store = useLazyRef(() => createStore(merge({}, DEFAULT_THEME, theme))).current;
  useEffect(() => {
    const configs = merge({}, DEFAULT_THEME, theme);
    store.setState(configs);
  }, [store, theme]);
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: store
  }, /*#__PURE__*/React.createElement(ThemedContainer, {
    children: children
  }));
};
export default ThemeProvider;
const selectBackground = state => state.colors.background;
const ThemedContainer = ({
  children
}) => {
  const backgroundColor = useTheme(selectBackground);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, children);
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export const useTheme = selector => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const state = useSyncExternalStoreWithSelector(theme.subscribe, theme.getState, selector);
  return state;
};
//# sourceMappingURL=ThemeProvider.js.map