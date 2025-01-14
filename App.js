import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import { ClassSettingsProvider } from './src/context/ClassContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GradeProvider } from "./src/context/GradesContext";
import { VerificationsProvider } from "./src/context/VerificationsContext";

export default function App() {
    return (
        <ThemeProvider>
            <ClassSettingsProvider>
                <GradeProvider>
                    <VerificationsProvider>
                        <ThemeContext.Consumer>
                            {({ darkThemeEnabled }) => (
                                <NavigationContainer theme={darkThemeEnabled ? DarkTheme : DefaultTheme}>
                                    <StatusBar style={darkThemeEnabled ? "light" : "dark"} />
                                    <AppNavigator/>
                                </NavigationContainer>
                            )}
                        </ThemeContext.Consumer>
                    </VerificationsProvider>
                </GradeProvider>
            </ClassSettingsProvider>
        </ThemeProvider>
    );
}