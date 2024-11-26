import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Verifiche from "../screens/Verifications";
import Grades from "../screens/Grades";
import TimeTable from "../screens/TimeTable";
// Create bottom tab navigator instance
const Tab = createBottomTabNavigator();

export default function TabNavigator({darkThemeEnabled, selectedClass, setSelectedClass, verifications, addVerification, deleteVerification, toggleMaturity, maturityIsEnabled}) {
    // Define colors based on theme
    const activeColor = darkThemeEnabled ? 'white' : 'black';
    const inactiveColor = darkThemeEnabled ? '#818181' : 'gray';

    return (
        <Tab.Navigator
            // Configure screen options for all tabs
            screenOptions={({ route, navigation }) => ({
                // Configure tab bar icons
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // Set appropriate icon names based on route and focus state
                    if (route.name === 'Orario') {
                        iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
                    } else if (route.name === 'Note') {
                        iconName = focused ? 'medal' : 'medal-outline';
                    } else if (route.name === 'Verifiche') {
                        iconName = focused ? 'reader' : 'reader-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                // Set tab bar colors
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                // Configure settings button in header right
                headerRight: () => (
                    <Pressable onPress={() => navigation.navigate('Settings')}>
                        <View style={styles.settingsButton}>
                            <Ionicons name={'settings-outline'} size={28} color={activeColor} />
                        </View>
                    </Pressable>
                ),
                // Configure share button in header left
                headerLeft: () => (
                    <Pressable>
                        <View style={styles.shareButton}>
                            <Ionicons name={'share-outline'} size={28} color={activeColor} />
                        </View>
                    </Pressable>
                ),
                // Set header style based on theme
                headerStyle: { backgroundColor: darkThemeEnabled ? 'black' : 'white' },
            })}
        >
            {/* TimeTable Screen */}
            <Tab.Screen name="Orario" options={{headerStatusBarHeight:65}}>
                {() => (<TimeTable
                    darkThemeEnabled={darkThemeEnabled}
                    addVerification={addVerification}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    toggleMaturity={toggleMaturity}
                    maturityIsEnabled={maturityIsEnabled}
                />)}
            </Tab.Screen>
            {/* Grades Screen */}
            <Tab.Screen name="Note" options={{headerStatusBarHeight:65}}>
                {(navigation) => (<Grades darkThemeEnabled={darkThemeEnabled} navigation={navigation}/>)}
            </Tab.Screen>
            {/* Verifications Screen */}
            <Tab.Screen name="Verifiche" options={{headerStatusBarHeight:65}}>
                {() => (<Verifiche darkThemeEnabled={darkThemeEnabled} verifications={verifications} deleteVerification={deleteVerification} />)}
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
