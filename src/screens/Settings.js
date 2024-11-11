// Import necessary React and React Native components
import React from "react";
import {Text, View, StyleSheet, ScrollView, Switch, Pressable} from "react-native";
import {useStyles} from "../utils/hooks/useStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
// Settings component that receives darkThemeEnabled state and toggleTheme function as props
const Settings = ({ darkThemeEnabled, toggleTheme,navigation }) => {
    // State for maturity toggle switch
    const [maturityIsEnabled, setMaturityIsEnabled] = React.useState(false);
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);
    // Get dynamic styles based on theme
    const styles = useStyles(createStyles, darkThemeEnabled);
    return (
        // Main container for settings screen
        <View style={styles.settingsContainer}>
            {/* Scrollable content area */}
            <ScrollView
                horizontal={false}
                contentContainerStyle={{ flexGrow: 1 }}
                alwaysBounceHorizontal={false}
            >
                {/* Select class */}
                <Pressable style={styles.element} onPress={() => navigation.navigate('TabNavigator')}>
                    <Text style={styles.text}>Cambia classe</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                </Pressable>
                {/* Maturity setting toggle */}
                <View style={styles.element}>
                    <Text style={styles.text}>Maturità</Text>
                    <Switch onValueChange={toggleMaturity} value={maturityIsEnabled} />
                </View>

                {/* Dark theme toggle with custom colors */}
                <View style={styles.element}>
                    <Text style={styles.text}>Dark Theme</Text>
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

// StyleSheet creation function that receives colors based on theme
const createStyles = (colors) => StyleSheet.create({
    // Main container styles
    settingsContainer: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 8,
        width: '100%',
    },
    // Individual setting element styles
    element: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100%',
        padding: 20,
        marginTop: 10,
        backgroundColor: colors.settingsSurface,
        height: 60,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    // Text styling for all settings
    text: {
        color: colors.settingsText,
    },
    // Footer section styles
    footer: {
        height: 60,
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    }
});
