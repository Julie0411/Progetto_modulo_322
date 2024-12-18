import React, { useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Switch, Pressable, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Settings component that receives darkThemeEnabled state and toggleTheme function as props
const Settings = ({ darkThemeEnabled, toggleTheme, navigation, setSelectedClass, setMaturityIsEnabled }) => {
    const [showOutput, setShowOutput] = useState(false);  // Stato per visualizzare la schermata delle informazioni

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleClassSelection = () => {
        setSelectedClass(null);
        setMaturityIsEnabled(false);
        navigation.navigate("TabNavigator");
    };

    const handleInformationPress = () => {
        setShowOutput(true); // Mostra la schermata delle informazioni
    };

    if (showOutput) {
        return <Output darkThemeEnabled={darkThemeEnabled} setShowOutput={setShowOutput} />;
    }

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
                <Pressable style={styles.element} onPress={handleInformationPress}>
                    <Text style={styles.text}>Informazione</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                </Pressable>
                {/* FAQ section */}
                <Pressable
                    style={styles.element}
                    onPress={() =>
                        Linking.openURL(
                            "https://docs.google.com/forms/d/e/1FAIpQLSfTcqhMF0NQejn-a-6ScxI5VZU4mRPrJ-LfDlwQDHpmEDlphw/viewform?usp=header"
                        )
                    }
                >
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

// Output component
const Output = ({ darkThemeEnabled, setShowOutput }) => {
    const styles = outputStyles(darkThemeEnabled);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ciao! Questa è la schermata Informazioni.</Text>
            <Pressable style={styles.button} onPress={() => setShowOutput(false)}>
                <Text style={styles.buttonText}>Torna a Impostazioni</Text>
            </Pressable>
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
        backgroundColor: darkThemeEnabled ? '#2e2e2e' : 'white',
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

const outputStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkThemeEnabled ? "black" : "white",
    },
    text: {
        fontSize: 20,
        color: darkThemeEnabled ? "white" : "black",
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: darkThemeEnabled ? "#2e2e2e" : "#f3f2f8",
        borderRadius: 10,
    },
    buttonText: {
        color: darkThemeEnabled ? "white" : "black",
        fontSize: 16,
    },
});
