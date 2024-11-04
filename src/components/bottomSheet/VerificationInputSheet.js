import React, { useState, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    contentContainer: {
        backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textInput: {
        color: darkThemeEnabled ? 'white' : 'black',
        borderBottomColor: darkThemeEnabled ? 'white' : 'black',
        borderBottomWidth: 1,
        width: '100%',
        fontSize: 18,
        marginBottom: 30,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: darkThemeEnabled ? '#333' : '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: darkThemeEnabled ? 'white' : 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.5
    },
    buttonText: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 16,
    },
    title: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
        marginBottom: 10
    }
});

const VerificationInputSheet = ({
    darkThemeEnabled,
    selectedEvent,
    setSelectedEvent,
    onSave
}) => {
    const [inputText, setInputText] = useState(selectedEvent?.text || "");
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleSave = () => {
        onSave(inputText + " ");
        setSelectedEvent(null);
    };

    const handleCancel = () => {
        setSelectedEvent(null);
    };

    return (
        <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.title}>
                Inserisci appunti per la verifica
            </Text>
            <BottomSheetTextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Inserisci qua"
                placeholderTextColor={darkThemeEnabled ? '#666' : '#aaa'}
            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleCancel}>
                    <Text style={[styles.buttonText, { color: 'red' }]}>
                        Cancel
                    </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </BottomSheetView>
    );
};

export default React.memo(VerificationInputSheet);
