import React, { useState, useCallback } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./src/navigation/TabNavigator";
import Settings from "./src/screens/Settings";
import {StatusBar} from "react-native";
import Initial from "./src/screens/Initial";

const Stack = createStackNavigator();
const headerStyle = { height: 110 };

export default function App() {
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);
    const [verifications, setVerifications] = useState([]);
    const toggleTheme = useCallback(() => {
        setDarkThemeEnabled(prev => !prev);
    }, []);
    const addVerification = useCallback((item) => {
        setVerifications(currentVerifications => [
            ...currentVerifications,
            {
                id: item.id,
                title: item.title,
                data: { ...item.start },
                text: item.text || "",
            }
        ]);
    }, []);
    const deleteVerification = useCallback((id) => {
        setVerifications(prev => prev.filter(verification => verification.id !== id));
    }, []);
    const theme = darkThemeEnabled ? DarkTheme : DefaultTheme;
    let firstOpen = true;

    return (
        <>
            <StatusBar barStyle={darkThemeEnabled ? 'light-content' : 'dark-content'} />
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerStyle }}>
                    <Stack.Screen
                        name="Initial"
                        options={{ headerShown: false }}
                    >
                        {() => (
                            <Initial
                                darkThemeEnabled={darkThemeEnabled}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name="TabNavigator"
                        options={{ headerShown: false, headerTitle: "Indietro" }}
                    >
                        {() => (
                            <TabNavigator
                                verifications={verifications}
                                addVerification={addVerification}
                                deleteVerification={deleteVerification}
                                darkThemeEnabled={darkThemeEnabled}
                                toggleTheme={toggleTheme}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Settings"
                        options={{ headerTitle: "Impostazioni" }}
                    >
                        {() => (
                            <Settings
                                toggleTheme={toggleTheme}
                                darkThemeEnabled={darkThemeEnabled}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
