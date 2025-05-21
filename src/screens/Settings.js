import React, {useContext,useMemo, useState} from "react";
import {Alert, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from '../context/ThemeContext';
import * as Haptics from "expo-haptics";
import {ClassContext} from "../context/ClassContext";

const Settings = ({navigation}) => {
    const { darkThemeEnabled, toggleTheme } = useContext(ThemeContext);
    const { setSelectedClass, setMaturityIsEnabled } = useContext(ClassContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleClassSelection = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        setSelectedClass(null);
        setMaturityIsEnabled(false);
        navigation.goBack();
        navigation.navigate('TabNavigator', {screen: 'Orario'});
    };

    const handleInformationPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        navigation.navigate('Information', {screen: 'Information'});
    };

    // Stato per visualizzare la schermata delle informazioni
    const [showInformation, setShowInformation] = useState(false);

    // Stato per esportare il calendario
    const handleExportPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        Alert.alert(
            "Esportazione completata!",
            "Puoi chiudere il pop-up",
            [{
                text: 'chiudi',
                style: 'default',
                onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
            }])
    }

    if (showInformation) {
        return <Informazioni darkThemeEnabled={darkThemeEnabled} setShowInformation={setShowInformation}/>;
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
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                        Alert.alert(
                            'Apri Google Form',
                            'Vuoi essere reindirizzato al questionario esterno?',
                            [{
                                text: 'Annulla',
                                style: 'destructive',
                                onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                            }, {
                                text: 'Procedi',
                                style: 'default',
                                onPress: () => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                                    Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfTcqhMF0NQejn-a-6ScxI5VZU4mRPrJ-LfDlwQDHpmEDlphw/viewform?usp=header")
                                }
                            }]
                        )
                    }
                    }
                >
                    <Text style={styles.text}>Hai altre domande?</Text>
                    <Ionicons name="chevron-forward-outline" size={24}
                              color={darkThemeEnabled ? 'white' : 'black'}/>
                </Pressable>
                {/* Version footer */}
                <View style={styles.footer}>
                    <Text style={styles.text}>Orario CPT Locarno</Text>
                    <Text style={styles.text}>v: a0.1</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default Settings;

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    settingsContainer: {
        backgroundColor: darkThemeEnabled ? 'black' : '#f3f2f8',
        flexDirection: 'column',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingHorizontal: 8,
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

