import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

const VerificationInputSheet = ({ darkThemeEnabled, selectedEvent, setSelectedEvent, onSave }) => {
    const [inputText, setInputText] = useState(selectedEvent?.text || "");
    const handleSave = () => {
        onSave(inputText);
        setSelectedEvent(null);
    };
    const handleCancel = () => {
        setSelectedEvent(null);
    };
    const styles = StyleSheet.create({
        contentContainer: {
            backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        textInput: {
            color: darkThemeEnabled ? 'white' : 'black',
            borderBottomColor: darkThemeEnabled ? 'white' : 'black',
            borderBottomWidth: 1,
            width: '100%',
            fontSize: 18,
            marginBottom: 20,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        button: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderColor: darkThemeEnabled ? 'white' : 'white',
            borderRadius: 10,
            marginHorizontal: 10,
            color: darkThemeEnabled ? 'white' : 'black',
            borderWidth: 0.5
        },
        buttonText: {
            color: darkThemeEnabled ? 'white' : 'black',
            fontSize: 16,
        },
    });

    return (
        <BottomSheetView style={styles.contentContainer}>
            <Text style={{ color: darkThemeEnabled ? 'white' : 'black', fontSize: 18, marginBottom: 10 }}>Inserisci appunti per la verifica</Text>
            <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Inserisci qua"
                placeholderTextColor={darkThemeEnabled ? '#666' : '#aaa'}
            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleCancel}>
                    <Text style={[styles.buttonText, { color: 'red' }]}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </BottomSheetView>
    );
};

export default VerificationInputSheet;
