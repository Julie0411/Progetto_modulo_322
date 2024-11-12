import React, {useState, useCallback } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./src/navigation/TabNavigator";
import Settings from "./src/screens/Settings";
import {StatusBar} from "react-native";
// Create stack navigator instance
const Stack = createStackNavigator();

export default function App() {
    // State management for theme and verifications
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);

    const [selectedClass, setSelectedClass] = useState(null);

    const [verifications, setVerifications] = useState([]);
    // Set theme based on darkThemeEnabled state
    const theme = darkThemeEnabled ? DarkTheme : DefaultTheme;
    // Theme toggle callback function
    const toggleTheme = useCallback(() => {
        setDarkThemeEnabled(prev => !prev);
    }, []);
    // Add verification callback function
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
    }, [selectedClass]);
    // Delete verification callback function
    const deleteVerification = useCallback((id) => {
        setVerifications(prev => prev.filter(verification => verification.id !== id));
    }, []);

    const handleSetClass = useCallback((selectedClass) => {
        setSelectedClass(selectedClass);
    }, []);

    return (
        <>
            {/* Status bar configuration based on theme */}
            <StatusBar barStyle={darkThemeEnabled ? 'light-content' : 'dark-content'} />
            {/* Main navigation container with theme */}
            <NavigationContainer theme={theme}>
                {/* Stack navigator with header style configuration */}
                <Stack.Navigator screenOptions={{ height: 110 }}>
                    {/* Tab navigator screen configuration */}
                    <Stack.Screen name="TabNavigator" options={{ headerShown: false, headerTitle: "Indietro" }}>
                        {() => (
                            <TabNavigator
                                verifications={verifications}
                                addVerification={addVerification}
                                deleteVerification={deleteVerification}
                                darkThemeEnabled={darkThemeEnabled}
                                toggleTheme={toggleTheme}
                                selectedClass={selectedClass}
                                setSelectedClass={handleSetClass}
                            />
                        )}
                    </Stack.Screen>

                    {/* Settings screen configuration */}
                    <Stack.Screen name="Settings" options={{ headerTitle: "Impostazioni" }}>
                        {({ navigation }) => (
                            <Settings
                                toggleTheme={toggleTheme}
                                darkThemeEnabled={darkThemeEnabled}
                                selectedClass={selectedClass}
                                navigation={navigation}
                                setSelectedClass={handleSetClass}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
