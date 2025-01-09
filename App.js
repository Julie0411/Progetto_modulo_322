import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useGrades } from './src/hooks/useGrades';
import { useVerifications } from './src/hooks/useVerifications';
import { useClassSettings } from './src/hooks/useClassSettings';

export default function App() {
    const { grades, addGrade, deleteGrade } = useGrades();
    const { verifications, addVerification, deleteVerification } = useVerifications();
    const classSettings = useClassSettings();

    return (
        <ThemeProvider>
            <ThemeContext.Consumer>
                {({ darkThemeEnabled }) => (
                    <NavigationContainer theme={darkThemeEnabled ? DarkTheme : DefaultTheme}>
                        <StatusBar style={darkThemeEnabled ? "light" : "dark"} />
                        <AppNavigator
                            grades={grades}
                            addGrade={addGrade}
                            deleteGrade={deleteGrade}
                            verifications={verifications}
                            addVerification={addVerification}
                            deleteVerification={deleteVerification}
                            darkThemeEnabled={darkThemeEnabled}
                            {...classSettings}
                        />
                    </NavigationContainer>
                )}
            </ThemeContext.Consumer>
        </ThemeProvider>
    );
}
