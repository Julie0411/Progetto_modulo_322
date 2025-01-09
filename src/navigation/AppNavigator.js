import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Settings from '../screens/Settings';
import GradeDetails from '../screens/GradeDetails';
import {Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const BackButton = ({ navigation, darkThemeEnabled }) => {
        return (
            <Pressable style={{marginLeft: 16}} onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={darkThemeEnabled ? 'white' : 'black'}
                    />
            </Pressable>
        );
};

export const AppNavigator = ({ darkThemeEnabled, ...props }) => (

    <Stack.Navigator id={'MainStackNavigator'}>
        <Stack.Screen
            name="TabNavigator"
            options={{ headerShown: false }}
        >
            {(navigation) => <TabNavigator {...props} navigation={navigation} />}
        </Stack.Screen>
        <Stack.Screen
            name="Settings"
            options={({ navigation }) => ({
                headerTitle: "Impostazioni",
                headerStyle: { backgroundColor: darkThemeEnabled ? 'black' : 'white' },
                    headerLeft: () => <BackButton navigation={navigation} darkThemeEnabled={darkThemeEnabled} />
            })}
            component={Settings}
        />
        <Stack.Screen
            name="GradeDetails"
            options={({ route, navigation }) => ({
                headerTitle: route?.params?.subjectTitle || "Note",
                headerStyle: { backgroundColor: darkThemeEnabled ? 'black' : 'white' },
                    headerLeft: () => <BackButton navigation={navigation} darkThemeEnabled={darkThemeEnabled} />
            })}
            component={GradeDetails}
        />
    </Stack.Navigator>
);
