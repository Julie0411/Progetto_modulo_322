import React, {useMemo} from "react";
import {Text, View, StyleSheet, ScrollView, Switch, Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// Settings component that receives darkThemeEnabled state and toggleTheme function as props
const Settings = ({ darkThemeEnabled, toggleTheme, navigation, setSelectedClass, setMaturityIsEnabled}) => {

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleClassSelection = () => {
        setSelectedClass(null)
        setMaturityIsEnabled(false)
        navigation.navigate('TabNavigator');
    };

    return (
        // Main container for settings screen
        <View style={styles.settingsContainer}>
            {/* Scrollable content area */}
            <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceHorizontal={false}>
                {/* Select class */}
                <Pressable style={styles.element} onPress={handleClassSelection}>
                    <Text style={styles.text}>Cambia classe</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                </Pressable>
                {/* Dark theme toggle with custom colors */}
                <View style={styles.element}>
                    <Text style={styles.text}>Tema nero</Text>
                    <Switch
                        trackColor={{ true: '#818181' }}
                        thumbColor={'#3c3c3c'}
                        onValueChange={toggleTheme}
                        value={darkThemeEnabled}
                    />
                </View>
                {/* Information section */}
                <Pressable style={styles.element}>
                    <Text style={styles.text}>Informazione</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                </Pressable>
                {/* FAQ section */}
                <Pressable style={styles.element}>
                    <Text style={styles.text}>Hai altre domande?</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                </Pressable>
                {/* Version footer */}
                <View style={styles.footer}>
                    <Text style={styles.text}>v: a0.1</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Settings;

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    settingsContainer: {
        backgroundColor: darkThemeEnabled ? 'black' : '#f3f2f8',
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 8,
        width: '100%',
    },
    element: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100%',
        padding: 20,
        marginTop: 10,
        backgroundColor: darkThemeEnabled? '#2e2e2e' : 'white',
        height: 60,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
    },
    footer: {
        height: 60,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0

    }
});
