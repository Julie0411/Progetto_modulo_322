import React, {useMemo, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";

const GradeInputSheet = ({darkThemeEnabled, onCancel, lessonTitle, lessonTime, onSaveGrade}) => {
    // Memoized styles based on theme
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
                time: lessonTime,
            };
            onSaveGrade(lessonTitle, newGrade);
            setGradeValue('');
            setNoteText('');
            onCancel();
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.gradeContainer}>
                <Text style={styles.title}>Inserisci la nota</Text>
                <BottomSheetTextInput
                    style={[styles.numberInput,{width: 70, textAlign: 'center'}]}
                    value={gradeValue}
                    onChangeText={handleGradeChange}
                    placeholder="1-6"
                    keyboardType="numeric"
                />
            </View>
            <Text style={[styles.title,{marginBottom: 10}]}>Inserisci un testo opzionale per la nota</Text>
            <BottomSheetTextInput
                style={styles.textInput}
                value={noteText}
                onChangeText={setNoteText}
                placeholder="es: Test scritto"
                placeholderTextColor={darkThemeEnabled ? '#666' : '#aaa'}
            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleCancel}>
                    <Text style={[styles.buttonText, { color: 'red' }]}>Annulla</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salva</Text>
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
        width: '100%',
        fontSize: 18,
        marginBottom: 30,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: darkThemeEnabled ? '#333' : '#f5f5f5',
    },
    numberInput: {
        color: darkThemeEnabled ? 'white' : 'black',
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
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
    },
    gradeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        marginBottom: 20,
        minHeight: 40,
        paddingVertical: 10,
    }
});
