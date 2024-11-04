import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { darkColors } from '../../theme/colors/dark';
import { lightColors } from '../../theme/colors/light';

export const useStyles = (styleCreator, darkThemeEnabled) => {
    const colors = darkThemeEnabled ? darkColors : lightColors;

    return useMemo(() => styleCreator(colors), [darkThemeEnabled]);
};
