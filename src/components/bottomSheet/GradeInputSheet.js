import React, {useMemo, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";

const GradeInputSheet = ({darkThemeEnabled, onCancel, lessonTitle, onSaveGrade}) => {

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const [gradeValue, setGradeValue] = useState('');

    const [noteText, setNoteText] = useState('');

    const handleGradeChange = (text) => {
        if (/^\d*\.?\d*$/.test(text)) {
            const includesDecimal = text.includes('.');
            const maxLength = includesDecimal ? 4 : 1;

            if (text.length <= maxLength) {
                const numericValue = parseFloat(text);
                if ((numericValue >= 1 && numericValue <= 6) || text === '') {
                    setGradeValue(text);
                }
            }
        }
    };

    const handleSave = () => {
        if (gradeValue && parseFloat(gradeValue) >= 1 && parseFloat(gradeValue) <= 6) {
            const newGrade = {
                grade: parseFloat(gradeValue),
                text: noteText.trim(),
                timestamp: new Date().toISOString() // Add timestamp for sorting if needed
            };

            onSaveGrade(lessonTitle, newGrade);
            setGradeValue('');
            setNoteText('');
        }
        onCancel();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.title}>Inserisci la nota</Text>
            <BottomSheetTextInput
                style={[styles.numberInput,{width: 70, textAlign: 'center'}]}
                value={gradeValue}
                onChangeText={handleGradeChange}
                placeholder="Enter a number"
                keyboardType="numeric"
            />
            <Text style={styles.title}>Inserisci un testo aggiuntivo per la nota</Text>
            <BottomSheetTextInput
                style={styles.textInput}
                value={noteText}
                onChangeText={setNoteText}
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

export default React.memo(GradeInputSheet);

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    contentContainer: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
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
    numberInput: {
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
