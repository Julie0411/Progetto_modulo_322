import React, {useContext, useMemo, useState} from "react";
import {FontAwesome} from "@expo/vector-icons";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {formatDate} from "../../utils/formatters/dateFormatter";
import {BottomSheetTextInput, BottomSheetView} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../../context/ThemeContext";
// VerificationReviewSheet component that displays and allows editing of lesson details
const EvaluationReviewSheet = ({item, setItem}) => {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Memoized styles based on dark theme setting
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);
    // State for managing edit mode and edited text content
    const [isEditing, setIsEditing] = useState(false);

    const [editedText, setEditedText] = useState('');
    // Toggle edit mode and set initial text
    const toggleEdit = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        setEditedText(item.text);
        setIsEditing(!isEditing);
    };
    // Save edited text and exit edit mode
    const saveChanges = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        setItem({...item, text: editedText});
        setIsEditing(false);
    };
    // Guard clause if no item is provided
    if (!item) return null;

    return (
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.element}>
                <Text style={styles.text}>Lezione:</Text>
                <Text style={styles.text}>{item.subject}</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Docente:</Text>
                <Text style={styles.text}>{item.teacher}</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Aula:</Text>
                <Text style={styles.text}>{item.classroom}</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Data:</Text>
                <Text style={styles.text}>{formatDate(item.data.dateTime)}</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Appunti: </Text>
                <View style={styles.textBody}>
                    {isEditing ? (
                        <BottomSheetTextInput
                            style={styles.textInput}
                            value={editedText}
                            onChangeText={setEditedText}
                            onSubmitEditing={saveChanges}
                            multiline
                            placeholder="es: Presentazione"
                            placeholderTextColor={darkThemeEnabled ? 'white' : 'black'}
                        />
                    ) : (
                        <Text style={[styles.text, {width: "90%"}]}>{item.text}</Text>
                    )}
                    <Pressable
                        onPress={() => {
                            if (!isEditing) {
                                toggleEdit();
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                            }
                        }}
                        style={styles.editIcon}
                    >
                        <FontAwesome
                            name="pencil"
                            size={23}
                            color={darkThemeEnabled ? 'white' : 'black'}
                        />
                    </Pressable>
                </View>
            </View>
            {isEditing && (
                <View style={styles.buttons}>
                    <Pressable onPress={toggleEdit} style={styles.button}>
                        <Text style={[styles.buttonText, {color: 'red'}]}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={saveChanges} style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                </View>
            )}
        </BottomSheetView>
    );
};

export default React.memo(EvaluationReviewSheet);

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    contentContainer: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        alignItems: 'baseline',
        gap: 20,
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
    },
    textBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
    },
    textInput: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
        padding: 0,
        margin: 0,
        height: 'auto',
        textAlignVertical: 'top',
        width: "90%",
    },
    editIcon: {
        width: 25,
        height: 25,
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        borderWidth: 1,
        borderColor: darkThemeEnabled ? 'white' : 'black',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 16,
    },
    element: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10
    },
});
