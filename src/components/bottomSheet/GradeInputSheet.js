import React, {useContext, useMemo, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {BottomSheetTextInput, BottomSheetView} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../../context/ThemeContext";
import {GradesContext} from "../../context/GradesContext";

const GradeInputSheet = ({onCancel, subjectTitle, lessonTime}) => {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const { addGrade } = useContext(GradesContext);

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
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
            const newGrade = {
                subjectTitle: subjectTitle,
                grade: parseFloat(gradeValue),
                text: noteText.trim(),
                time: lessonTime,
            };
            addGrade(newGrade);
            console.log(newGrade);
            setGradeValue('');
            setNoteText('');
            onCancel();
        }
    };

    const handleCancel = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        onCancel();
    };

    return (
        <BottomSheetView style={styles.container}>
            <Text style={styles.title}>Aggiungere una valutazione</Text>

            <View style={styles.gradeContainer}>
                <Text style={styles.text}>Nota: </Text>
                <BottomSheetTextInput
                    style={[styles.numberInput, {width: 70, textAlign: 'center'}]}
                    value={gradeValue}
                    onChangeText={handleGradeChange}
                    placeholder="1-6"
                    placeholderTextColor={darkThemeEnabled ? '#666' : '#aaa'}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.noteContainer}>
                <Text style={styles.text}>Testo opzionale:</Text>
                <BottomSheetTextInput
                    style={styles.textInput}
                    value={noteText}
                    onChangeText={setNoteText}
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

export default React.memo(GradeInputSheet);

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
    gradeContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
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
    numberInput: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: darkThemeEnabled ? '#333' : '#f5f5f5',
    },
    noteContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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
