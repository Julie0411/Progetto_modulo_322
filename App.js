import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./components/TabNavigator";
import Settings from "./components/Settings";

const Stack = createStackNavigator();
const headerStyle = { height: 100 };

export default function App() {
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);
    const toggleTheme = () => setDarkThemeEnabled(!darkThemeEnabled);

    return (
        <NavigationContainer theme={darkThemeEnabled ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={{ headerStyle }}>
                <Stack.Screen name="TabNavigator" options={{ headerShown: false, headerTitle:"Indietro" }}>
                    {() => (<TabNavigator darkThemeEnabled={darkThemeEnabled} toggleTheme={toggleTheme} />)}
                </Stack.Screen>
                <Stack.Screen name="Settings" options={{ headerTitle:"Impostazioni"}}>
                    {() => (<Settings toggleTheme={toggleTheme} darkThemeEnabled={darkThemeEnabled} />)}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
