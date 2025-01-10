import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Settings from '../screens/Settings';
import GradeDetails from '../screens/GradeDetails';
import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {GradesContext} from "../context/GradesContext";

const Stack = createStackNavigator();

const BackButton = ({ navigation, darkThemeEnabled }) => {
    return (
        <Pressable style={{ marginLeft: 16 }} onPress={() => navigation.goBack()}>
            <Ionicons
                name="arrow-back"
                size={24}
                color={darkThemeEnabled ? 'white' : 'black'}
            />
        </Pressable>
    );
};

export const AppNavigator = () => {
    const { darkThemeEnabled } = useContext(ThemeContext);
    const { sortAscending, setSortAscending } = useContext(GradesContext);

    return (
        <Stack.Navigator id={'MainStackNavigator'}>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={({ navigation }) => ({
                    headerTitle: "Impostazioni",
                    headerStyle: { backgroundColor: darkThemeEnabled ? 'black' : 'white' },
                    headerLeft: () => (
                        <BackButton navigation={navigation} darkThemeEnabled={darkThemeEnabled} />
                    ),
                })}
            />
            <Stack.Screen
                name="GradeDetails"
                component={GradeDetails}
                options={({ route, navigation }) => ({
                    headerTitle: route?.params?.subjectTitle || "Note",
                    headerStyle: { backgroundColor: darkThemeEnabled ? 'black' : 'white' },
                    headerLeft: () => (
                        <BackButton navigation={navigation} darkThemeEnabled={darkThemeEnabled} />
                    ),
                    headerRight: () => (
                        <Pressable
                            style={{marginRight: 16}}
                            onPress={() => setSortAscending(!sortAscending)}
                        >
                            <MaterialCommunityIcons
                                name={sortAscending ? "sort-clock-ascending" : "sort-clock-descending"}
                                size={24}
                                color={darkThemeEnabled ? 'white' : 'black'}
                            />
                        </Pressable>
                    )
                })}
            />
        </Stack.Navigator>
    );
};
