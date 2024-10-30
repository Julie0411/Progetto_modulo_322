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
    const [verifiche,setVerifiche] = useState([{title:"Kra m322", data:{"datatime":"2024-11-04T14:45:00"}}]);

    function addVerifiche(item){
        setVerifiche(currentVerifiche => [
            ...verifiche,{title: item.title,data:item.data}
        ])
    }

    return (
        <NavigationContainer theme={darkThemeEnabled ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={{ headerStyle }}>
                <Stack.Screen name="TabNavigator" options={{ headerShown: false, headerTitle:"Indietro" }}>
                    {() => (<TabNavigator verifiche={verifiche} addVerifiche={addVerifiche} darkThemeEnabled={darkThemeEnabled} toggleTheme={toggleTheme} />)}
                </Stack.Screen>
                <Stack.Screen name="Settings" options={{ headerTitle:"Impostazioni"}}>
                    {() => (<Settings toggleTheme={toggleTheme} darkThemeEnabled={darkThemeEnabled} />)}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
