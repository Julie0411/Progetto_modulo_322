import { useMemo } from 'react';
import { darkColors } from '../../theme/colors/dark';
import { lightColors } from '../../theme/colors/light';

export const useStyles = (styleCreator, darkThemeEnabled) => {
    const colors = darkThemeEnabled ? darkColors : lightColors;
    return useMemo(() => styleCreator(colors), [darkThemeEnabled]);
};
