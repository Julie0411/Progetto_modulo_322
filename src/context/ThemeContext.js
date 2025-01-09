import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
    const toggleTheme = () => setDarkThemeEnabled(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkThemeEnabled, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
