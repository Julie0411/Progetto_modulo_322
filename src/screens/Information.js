import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";

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
            <Pressable style={styles.button} onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                setShowOutput(false)
            }}>
                <Text style={styles.buttonText}>Torna a Impostazioni</Text>
            </Pressable>
        </View>
    );
};

export default Information;

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
