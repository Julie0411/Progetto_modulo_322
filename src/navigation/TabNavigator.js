import React, {useContext} from 'react';
import Grades from "../screens/Grades";
import TimeTable from "../screens/TimeTable";
import Verifiche from "../screens/Evaluations";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../context/ThemeContext";
import {ClassContext} from "../context/ClassContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const { darkThemeEnabled } = useContext(ThemeContext);

    const { selectedClass } = useContext(ClassContext);

    const activeColor = darkThemeEnabled ? 'white' : 'black';
    const inactiveColor = darkThemeEnabled ? '#818181' : 'gray';

    const HeaderButton = ({ icon, onPress, disabled = false }) => (
        <Pressable
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                onPress();
            }}
            disabled={disabled}
            style={{opacity: disabled ? 0.5 : 1, marginBottom: 10}}
        >
            <View style={icon === 'settings-outline' ? styles.settingsButton : styles.shareButton}>
                <Ionicons name={icon} size={28} color={activeColor}/>
            </View>
        </Pressable>
    );

    return (
        <Tab.Navigator
            id={'BottomTabNavigator'}
            screenOptions={({route, navigation}) => ({
                tabBarStyle: {
                    backgroundColor: darkThemeEnabled ? 'black' : 'white',
                },
                tabBarIcon: ({focused, color, size}) => {
                    const iconMap = {
                        'Orario': focused ? 'calendar-clear' : 'calendar-clear-outline',
                        'Note': focused ? 'medal' : 'medal-outline',
                        'Verifiche': focused ? 'reader' : 'reader-outline'
                    };
                    return <Ionicons name={iconMap[route.name]} size={size} color={color}/>;
                },
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        disabled={!selectedClass}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                            props.onPress();
                        }}
                        style={[props.style, {opacity: selectedClass ? 1 : 0.5}]}
                    />
                ),
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                headerRight: () => (
                    <HeaderButton
                        icon="settings-outline"
                        onPress={() => navigation.navigate('Settings')}
                        disabled={!selectedClass}
                    />
                ),
                headerStyle: {
                    backgroundColor: darkThemeEnabled ? 'black' : 'white'
                },
            })}
        >
            <Tab.Screen name="Orario" component={TimeTable}/>
            <Tab.Screen name="Note" component={Grades}/>
            <Tab.Screen name="Verifiche" component={Verifiche}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    settingsButton: {
        marginRight: 20,
    },
    shareButton: {
        marginLeft: 20,
    }
});

export default TabNavigator;
