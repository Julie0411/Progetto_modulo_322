import React, { useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Switch, Pressable, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import verificationReviewSheet from "../components/bottomSheet/VerificationReviewSheet";
// Settings component that receives darkThemeEnabled state and toggleTheme function as props
const Settings = ({ darkThemeEnabled, toggleTheme, navigation, setSelectedClass, setMaturityIsEnabled }) => {
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleClassSelection = () => {
        setSelectedClass(null);
        setMaturityIsEnabled(false);
        navigation.goBack();
        navigation.navigate('TabNavigator', {screen: 'Orario'});
    };

    const handleInformationPress = () => {
        setShowInformation(true); // Mostra la schermata delle informazioni
    };

    // Stato per visualizzare la schermata delle informazioni
    const [showInformation, setShowInformation] = useState(false);

    // Stato per esportare il calendario
    const handleExportPress = () => {

    }

    if (showInformation) {
        return <Information darkThemeEnabled={darkThemeEnabled} setShowInformation={setShowInformation}/>;
    }

    if (showOutput) {
        return <Output darkThemeEnabled={darkThemeEnabled} setShowOutput={setShowOutput}/>;
    }

    return (
        // Main container for settings screen
        <View style={styles.settingsContainer}>
            {/* Scrollable content area */}
            <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} alwaysBounceHorizontal={false}>
                {/* Select class */}
                <Pressable style={styles.element} onPress={handleClassSelection}>
                    <Text style={styles.text}>Cambia classe</Text>
                    <Ionicons name="chevron-forward-outline" size={24}
                              color={darkThemeEnabled ? 'white' : 'black'}/>
                </Pressable>
                {/* Dark theme toggle with custom colors */}
                <View style={styles.element}>
                    <Text style={styles.text}>Tema nero</Text>
                    <Switch
                        trackColor={{true: '#818181'}}
                        thumbColor={'#3c3c3c'}
                        onValueChange={toggleTheme}
                        value={darkThemeEnabled}
                    />
                </View>
                {/* Export calendar */}
                <Pressable style={styles.element} onPress={handleExportPress}>
                    <Text style={styles.text}>Esporta calendario</Text>
                    <Ionicons name="chevron-forward-outline" size={24}
                              color={darkThemeEnabled ? 'white' : 'black'}/>
                </Pressable>
                {/* Information section */}
                <Pressable style={styles.element} onPress={handleInformationPress}>
                    <Text style={styles.text}>Informazioni utili</Text>
                    <Ionicons name="chevron-forward-outline" size={24}
                              color={darkThemeEnabled ? 'white' : 'black'}/>
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
                    <Ionicons name="chevron-forward-outline" size={24}
                              color={darkThemeEnabled ? 'white' : 'black'}/>
                </Pressable>
                {/* Version footer */}
                <View style={styles.footer}>
                    <Text style={styles.text}>v: a0.1</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const Information = ({darkThemeEnabled, setShowInformation}) => {
    const styles = informationStyles(darkThemeEnabled);

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>1. Come aggiungo un test?</Text>
            <Text style={styles.text}>
                Per aggiungere un test, tieni premuto sulla lezione nell'orario nella quale si farà il test, riempi
                i campi richiesti e clicca salvare.
            </Text>
            <Text style={styles.questionText}>2. Come aggiungo una nota?</Text>
            <Text style={styles.text}>
                Per aggiungere una nota, clicca sulla lezione nell'orario, inserisci la nota e il tipo di test
                (presentazione, interrogazione, test scritto) e infine clicca salva.
            </Text>
            <Text style={styles.questionText}>3. Come esporto il calendario?</Text>
            <Text style={styles.text}>
                Semplice: schiaccia il bottone esporta in alto a sinistra, e poi conferma. Aprendo i file troverai i
                dati del calendario e le note esportate.
            </Text>
            <Text style={styles.questionText}>4. Cosa significano colori?</Text>
            <View style={styles.colorContainer}>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, {backgroundColor: '#6089d6'}]}/>
                    <Text style={styles.colorText}>Moduli tecnici</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, {backgroundColor: '#82ba2e'}]}/>
                    <Text style={styles.colorText}>Cultura generale</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, {backgroundColor: '#d3cc4e'}]}/>
                    <Text style={styles.colorText}>Materie di maturità</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, {backgroundColor: '#d66083'}]}/>
                    <Text style={styles.colorText}>Educazione fisica</Text>
                </View>
            </View>
            <Pressable style={styles.button} onPress={() => setShowOutput(false)}>
                <Text style={styles.buttonText}>Torna a Impostazioni</Text>
            </Pressable>
        </View>
    );
};

export default Settings;

const informationStyles = (darkThemeEnabled) => {

    const colors = {
        background: darkThemeEnabled ? 'black' : '#f3f2f8',
        text: darkThemeEnabled ? '#f3f2f8' : 'black',
        buttonBackground: '#6089D6',
        buttonText: '#f3f2f8',
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
            shadowOffset: {width: 0, height: 4},
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
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 4,
        },
        buttonText: {
            fontSize: 16,
            color: colors.buttonText,
            fontWeight: '600',
        },
        colorContainer: {
            gap: 10
        },
        colorRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        colorSquare: {
            width: 20,
            height: 20,
            marginRight: 10,
            borderRadius: 4,
        },
        colorText: {
            fontSize: 16,
            color: colors.text,
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

