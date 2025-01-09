import React, {useMemo, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {BottomSheetTextInput, BottomSheetView} from "@gorhom/bottom-sheet";

const VerificationInputSheet = ({darkThemeEnabled, selectedEvent, setSelectedEvent, onSave, onCancel}) => {
    // Memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const [inputText, setInputText] = useState(selectedEvent?.text || "");

    const handleSave = () => {
        onSave(inputText);
        setSelectedEvent(null);
    };

    const handleCancel = () => {
        onCancel();
        setSelectedEvent(null);
    };

    return (
        <BottomSheetView style={styles.container}>
            <Text style={styles.title}>Inserisci appunti per la verifica</Text>

            <View style={styles.noteContainer}>
                <Text style={styles.text}>Testo:</Text>
                <BottomSheetTextInput
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="es: Test scritto"
                    placeholderTextColor={darkThemeEnabled ? '#666' : '#aaa'}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleCancel}>
                    <Text style={[styles.buttonText, {color: 'red'}]}>Annulla</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salva</Text>
                </Pressable>
            </View>
        </BottomSheetView>
    );
};

export default React.memo(VerificationInputSheet);

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: darkThemeEnabled ? 'white' : 'black',
        borderBottomWidth: 1,
        borderBottomColor: darkThemeEnabled ? 'white' : 'black',
    },
    noteContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    textInput: {
        flex: 1,
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: darkThemeEnabled ? '#333' : '#f5f5f5',
        marginLeft: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginHorizontal: 10,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 0.5
    },
    buttonText: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 16,
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
    }
});
