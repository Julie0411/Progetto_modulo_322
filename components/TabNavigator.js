import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Verifications from "./Verifications";
import Orario from "./Orario";
import Note from "./Note";

const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
    const activeColor = props.darkThemeEnabled ? 'white' : 'black';
    const inactiveColor = props.darkThemeEnabled ? '#818181' : 'gray';
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
                headerStyle: { backgroundColor: props.darkThemeEnabled ? 'black' : 'white' },
            })}
        >
            <Tab.Screen name="Orario" options={{headerStatusBarHeight:65}}>
                {() => (<Orario darkThemeEnabled={props.darkThemeEnabled} addVerification={props.addVerification} />)}
            </Tab.Screen>
            <Tab.Screen name="Note" options={{headerStatusBarHeight:65}}>
                {() => (<Note darkThemeEnabled={props.darkThemeEnabled} />)}
            </Tab.Screen>
            <Tab.Screen name="Verifiche" options={{headerStatusBarHeight:65}}>
                {() => (<Verifications darkThemeEnabled={props.darkThemeEnabled} verifications={props.verifications} deleteVerification={props.deleteVerification} />)}
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
    },
    padding:{
        padding: 100
    }
});
