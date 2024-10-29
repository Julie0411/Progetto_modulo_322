import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Verifiche from "./Verifiche";
import Orario from "./Orario";
import Note from "./Note";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ darkThemeEnabled }) {
    const activeColor = darkThemeEnabled ? 'white' : 'black';
    const inactiveColor = darkThemeEnabled ? '#818181' : 'gray';

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Orario') {
                        iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
                    } else if (route.name === 'Note') {
                        iconName = focused ? 'medal' : 'medal-outline';
                    } else if (route.name === 'Verifiche') {
                        iconName = focused ? 'reader' : 'reader-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: activeColor, tabBarInactiveTintColor: inactiveColor,
                headerRight: () => (
                    <Pressable onPress={() => navigation.navigate('Settings')}>
                        <View style={styles.settingsButton}>
                            <Ionicons name={'settings-outline'} size={28} color={activeColor} />
                        </View>
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable>
                        <View style={styles.shareButton}>
                            <Ionicons name={'share-outline'} size={28} color={activeColor} />
                        </View>
                    </Pressable>
                ),
                headerStyle: { backgroundColor: darkThemeEnabled ? '#121212' : 'white' },
            })}
        >
            <Tab.Screen name="Orario" >
                {() => (<Orario darkThemeEnabled={darkThemeEnabled} />)}
            </Tab.Screen>
            <Tab.Screen name="Note" >
                {() => (<Note darkThemeEnabled={darkThemeEnabled} />)}
            </Tab.Screen>
            <Tab.Screen name="Verifiche" >
                {() => (<Verifiche darkThemeEnabled={darkThemeEnabled} />)}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    settingsButton: {
        marginRight: 20,
    },
    shareButton: {
        marginLeft: 20,
    }
});
