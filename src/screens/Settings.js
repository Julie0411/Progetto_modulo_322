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
            <Text style={styles.questionText}>1. Come aggiungo un test?</Text>
            <Text style={styles.text}>
                Aggiungere un test è semplice, clicca sulla lezione nella quale si farà il test, riempi i campi richiesti, clicca salvare.
            </Text>
            <Text style={styles.questionText}>2. Come aggiungo una nota?</Text>
            <Text style={styles.text}>
                Aggiungere una nota è semplice, clicca su note, clicca il modulo/la materia alla quale devi aggiungere una nota, clicca il “+” in alto a destra, inserisci la nota e il tipo di test (presentazione, interrogazione, test scritto) e infine clicca salva.
            </Text>
            <Text style={styles.questionText}>3. Come esporto il calendario?</Text>
            <Text style={styles.text}>
                Semplice: schiaccia il bottone esporta in alto a sinistra, e poi conferma. Aprendo i file troverai i dati del calendario e le note esportate.
            </Text>
            <Pressable style={styles.button} onPress={() => setShowOutput(false)}>
                <Text style={styles.buttonText}>Torna a Impostazioni</Text>
            </Pressable>
        </View>
    );
};

export default Settings;

const outputStyles = (darkThemeEnabled) => {
    const colors = {
        background: darkThemeEnabled ? 'black' : '#f3f2f8',
        text: darkThemeEnabled ? '#f3f2f8' : 'black',
        buttonBackground: darkThemeEnabled ? '#5CBCF3' : '#007AFF',
        buttonText: '#FFFFFF',
        cardBackground: darkThemeEnabled ? '#1E1E1E' : '#FFFFFF',
        shadowColor: darkThemeEnabled ? '#000000' : '#CCCCCC',
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
        },
        text: {
            fontSize: 16,
            color: colors.text,
            marginBottom: 12,
            lineHeight: 24,
        },
        questionText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 12,
        },
        card: {
            backgroundColor: colors.cardBackground,
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 5,
        },
        button: {
            marginTop: 20,
            paddingVertical: 14,
            paddingHorizontal: 20,
            backgroundColor: colors.buttonBackground,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 4,
        },
        buttonText: {
            fontSize: 16,
            color: colors.buttonText,
            fontWeight: '600',
        },
    });
};

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

const textStyle = (darkThemeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'left',
        backgroundColor: darkThemeEnabled ? "black" : "white"
    },
    text: {
        fontSize: 16,
        color: darkThemeEnabled ? "white" : "black"
    }
});