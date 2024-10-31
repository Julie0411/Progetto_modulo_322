import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./components/TabNavigator";
import Settings from "./components/Settings";
import {StatusBar} from "react-native";

const Stack = createStackNavigator();
const headerStyle = { height: 110 };

export default function App() {
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);
    const toggleTheme = () => setDarkThemeEnabled(!darkThemeEnabled);
    const [verifications,setVerifications] = useState([{id:100,title:"title",text:"tetexttexttexttexttexttexttexttexttexttexttextxt",data:{"dateTime": "2024-11-05T13:05:00"}}]);

    function addVerification(item) {
        setVerifications(currentVerifications => [
            ...currentVerifications,
            {
                id: Math.random().toString(),
                title: item.title,
                data: { ...item.start },
                text: item.text || ""
            }
        ]);
    }

    function deleteVerification(id) {
        setVerifications(currentVerifications => {
            return currentVerifications.filter((verification) => verification.id !== id);
        });
    }

    return (
        <>
            <StatusBar barStyle={darkThemeEnabled? 'light-content':'dark-content'}/>
            <NavigationContainer theme={darkThemeEnabled ? DarkTheme : DefaultTheme}>
                <Stack.Navigator screenOptions={{ headerStyle }}>
                    <Stack.Screen name="TabNavigator" options={{ headerShown: false, headerTitle:"Indietro" }}>
                        {() => (<TabNavigator verifications={verifications} addVerification={addVerification} deleteVerification={deleteVerification} darkThemeEnabled={darkThemeEnabled} toggleTheme={toggleTheme} />)}
                    </Stack.Screen>
                    <Stack.Screen name="Settings" options={{ headerTitle:"Impostazioni"}}>
                        {() => (<Settings toggleTheme={toggleTheme} darkThemeEnabled={darkThemeEnabled} />)}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </>

    );
}
