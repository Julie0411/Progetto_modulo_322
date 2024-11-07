// Import necessary React and React Native components
import React, { useState, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";

// VerificationInputSheet component for handling verification note inputs
const VerificationInputSheet = ({
                                    darkThemeEnabled,    // Boolean for dark/light theme
                                    selectedEvent,       // Currently selected event object
                                    setSelectedEvent,    // Function to update selected event
                                    onSave              // Callback function when saving
                                }) => {
    // State for managing input text, initialized with selected event text if exists
    const [inputText, setInputText] = useState(selectedEvent?.text || "");

    // Memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    // Handler for saving the input text
    const handleSave = () => {
        onSave(inputText + " ");
        setSelectedEvent(null);
    };

    // Handler for canceling the input
    const handleCancel = () => {
        setSelectedEvent(null);
    };

    // Component render
    return (
        <BottomSheetView style={styles.contentContainer}>
            {/* Title text */}
            <Text style={styles.title}>
                Inserisci appunti per la verifica
            </Text>
            {/* Input field for verification notes */}
            <BottomSheetTextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Inserisci qua"
                placeholderTextColor={darkThemeEnabled ? '#666' : '#aaa'}
            />
            {/* Container for action buttons */}
            <View style={styles.buttonContainer}>
                {/* Cancel button */}
                <Pressable style={styles.button} onPress={handleCancel}>
                    <Text style={[styles.buttonText, { color: 'red' }]}>
                        Cancel
                    </Text>
                </Pressable>
                {/* Save button */}
                <Pressable style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </BottomSheetView>
    );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(VerificationInputSheet);

// Style creation function based on theme
const createStyles = (darkThemeEnabled) => StyleSheet.create({
    // Main container styles
    contentContainer: {
        backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    // Text input field styles
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
    // Button container styles
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    // Individual button styles
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: darkThemeEnabled ? 'white' : 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.5
    },
    // Button text styles
    buttonText: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 16,
    },
    // Title text styles
    title: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
        marginBottom: 10
    }
});
