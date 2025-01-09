import React from 'react';
import Grades from "../screens/Grades";
import TimeTable from "../screens/TimeTable";
import Verifiche from "../screens/Verifications";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Create bottom tab navigator instance
const Tab = createBottomTabNavigator();

export default function TabNavigator({
                                         darkThemeEnabled,
                                         selectedClass,
                                         setSelectedClass,
                                         verifications,
                                         addGrade,
                                         addVerification,
                                         deleteVerification,
                                         toggleMaturity,
                                         maturityIsEnabled,
                                         grades
                                     }) {
    // Define colors based on theme
    const activeColor = darkThemeEnabled ? 'white' : 'black';
    const inactiveColor = darkThemeEnabled ? '#818181' : 'gray';

    return (
        <Tab.Navigator
            // Configure screen options for all tabs
            screenOptions={({route, navigation}) => ({
                // Configure tab bar icons
                tabBarStyle: {backgroundColor: darkThemeEnabled ? 'black' : 'white',},
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    // Set appropriate icon names based on route and focus state
                    if (route.name === 'Orario') {
                        iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
                    } else if (route.name === 'Note') {
                        iconName = focused ? 'medal' : 'medal-outline';
                    } else if (route.name === 'Verifiche') {
                        iconName = focused ? 'reader' : 'reader-outline';
                    }
                    // Return icon component
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        disabled={!selectedClass}
                        style={[
                            props.style,
                            {opacity: selectedClass ? 1 : 0.5}
                        ]}
                    />
                ),
                // Set tab bar colors
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                // Configure settings button in header right
                headerRight: () => (
                    <Pressable onPress={() => navigation.navigate('Settings')} disabled={!selectedClass}
                               style={{opacity: selectedClass ? 1 : 0.5, marginBottom: 10}}>
                        <View style={styles.settingsButton}>
                            <Ionicons name={'settings-outline'} size={28} color={activeColor}/>
                        </View>
                    </Pressable>
                ),
                // Configure share button in header left
                headerLeft: () => (
                    <Pressable disabled={!selectedClass} style={{opacity: selectedClass ? 0 : 0, marginBottom: 10}}>
                        <View style={styles.shareButton}>
                            <Ionicons name={'share-outline'} size={28} color={activeColor}/>
                        </View>
                    </Pressable>
                ),
                // Set header style based on theme
                headerStyle: {backgroundColor: darkThemeEnabled ? 'black' : 'white'},
            })}
        >
            {/* TimeTable Screen */}
            <Tab.Screen name="Orario">
                {() => (<TimeTable
                    darkThemeEnabled={darkThemeEnabled}
                    addVerification={addVerification}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    toggleMaturity={toggleMaturity}
                    maturityIsEnabled={maturityIsEnabled}
                    addGrade={addGrade}
                />)}
            </Tab.Screen>
            {/* Grades Screen */}
            <Tab.Screen name="Note">
                {(navigation) => (<Grades darkThemeEnabled={darkThemeEnabled} navigation={navigation}
                                          maturityIsEnabled={maturityIsEnabled} selectedClass={selectedClass}
                                          grades={grades}/>)}
            </Tab.Screen>
            {/* Verifications Screen */}
            <Tab.Screen name="Verifiche">
                {() => (<Verifiche darkThemeEnabled={darkThemeEnabled} verifications={verifications}
                                   deleteVerification={deleteVerification}/>)}
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
    padding: {
        padding: 100
    }
});
