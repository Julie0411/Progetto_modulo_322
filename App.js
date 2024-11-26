import React, {useState, useCallback } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./src/navigation/TabNavigator";
import Settings from "./src/screens/Settings";
import {Pressable, StatusBar} from "react-native";
import GradeDetails from "./src/screens/GradeDetails";
import Grades from "./src/screens/Grades";
import Ionicons from "react-native-vector-icons/Ionicons";
// Create stack navigator instance
const Stack = createStackNavigator();

export default function App() {
    // State management for theme and verifications
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);

    const [selectedClass, setSelectedClass] = useState({label:"1"});

    const [verifications, setVerifications] = useState([]);
    // Set theme based on darkThemeEnabled state
    const theme = darkThemeEnabled ? DarkTheme : DefaultTheme;
    // State for maturity toggle
    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);
    // Toggle handler for maturity switch
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);
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
                    <Stack.Screen name="TabNavigator" options={{ headerShown: false}}>
                        {(navigation) => (
                            <TabNavigator
                                verifications={verifications}
                                addVerification={addVerification}
                                deleteVerification={deleteVerification}
                                darkThemeEnabled={darkThemeEnabled}
                                toggleTheme={toggleTheme}
                                selectedClass={selectedClass}
                                setSelectedClass={handleSetClass}
                                toggleMaturity={toggleMaturity}
                                maturityIsEnabled={maturityIsEnabled}
                                navigation={navigation}
                            />
                        )}
                    </Stack.Screen>

                    {/* Settings screen configuration */}
                    <Stack.Screen name="Settings"  options={({navigation }) => ({
                        headerTitle: "Impostazioni",
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                                <Ionicons name="arrow-back" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                            </Pressable>
                        )
                    })}>
                        {({ navigation }) => (
                            <Settings
                                toggleTheme={toggleTheme}
                                darkThemeEnabled={darkThemeEnabled}
                                selectedClass={selectedClass}
                                navigation={navigation}
                                setSelectedClass={handleSetClass}
                                setMaturityIsEnabled={setMaturityIsEnabled}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Grades" options={{headerShown: false, headerTitle: "Note" }} component={Grades} />
                    <Stack.Screen
                        name="GradeDetails"
                        options={({ route, navigation }) => ({
                            headerTitle: route.params?.lessonTitle || "Note",
                            headerLeft: () => (
                                <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                                    <Ionicons name="arrow-back" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                                </Pressable>
                            ),
                            headerRight: () => (
                                <Pressable onPress={() => navigation.setParams({ showAddGrade: true })} style={{ marginRight: 16 }}>
                                    <Ionicons name="add-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                                </Pressable>
                            )
                        })}
                        initialParams={{ darkThemeEnabled: darkThemeEnabled }}
                        component={GradeDetails}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
