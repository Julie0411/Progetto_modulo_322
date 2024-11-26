import React, { useState } from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { formatDate } from "../../utils/formatters/dateFormatter";
import { useStyles } from "../../utils/hooks/useStyles";
// VerificationReviewSheet component that displays and allows editing of lesson details
const VerificationReviewSheet = ({ darkThemeEnabled, item, setItem }) => {
    // State for managing edit mode and edited text content
    const [isEditing, setIsEditing] = useState(false);

    const [editedText, setEditedText] = useState('');
    // Memoized styles based on dark theme setting
    const styles = useStyles(createStyles, darkThemeEnabled);
    // Split the item title into components (teacher, lesson, room)
    const [firstPart, roomPart] = item.title.split('\n');

    const [insegnante, ...lezioneParts] = firstPart.split(" ");

    const lezione = lezioneParts.join(" ");
    // Toggle edit mode and set initial text
    const toggleEdit = () => {
        setEditedText(item.text);
        setIsEditing(!isEditing);
    };
    // Save edited text and exit edit mode
    const saveChanges = () => {
        setItem({ ...item, text: editedText });
        setIsEditing(false);
    };
    // Guard clause if no item is provided
    if (!item) return null;

    return (
        <BottomSheetView style={styles.contentContainer}>
            {/* Display lesson details */}
            <Text style={styles.text}>Lezzione: {lezione}</Text>
            <Text style={styles.text}>Insegnante: {insegnante}</Text>
            <Text style={styles.text}>Aula: {roomPart}</Text>
            <Text style={styles.text}>Data: {formatDate(item.data.dateTime)}</Text>
            {/* Notes section with edit functionality */}
            <View style={styles.textBody}>
                <Text style={styles.text}>Appunti: </Text>
                {isEditing ? (
                    // Editable text input when in edit mode
                    <BottomSheetTextInput
                        style={styles.textInput}
                        value={editedText}
                        onChangeText={setEditedText}
                        onSubmitEditing={saveChanges}
                        multiline
                        placeholder="Inserisci qua"
                        placeholderTextColor={darkThemeEnabled ? 'white' : 'black'}
                    />
                ) : (
                    // Display text when not editing
                    <Text style={styles.text}>{item.text}</Text>
                )}
                {/* Edit icon button */}
                <Pressable onPress={isEditing ? null : toggleEdit} style={styles.editIcon}>
                    <FontAwesome
                        name="pencil"
                        size={20}
                        color={darkThemeEnabled ? 'white' : 'black'}
                    />
                </Pressable>
            </View>
            {/* Edit mode buttons */}
            {isEditing && (
                <View style={styles.buttons}>
                    <Pressable onPress={toggleEdit} style={styles.button}>
                        <Text style={[styles.buttonText, {color: 'red'}]}>
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable onPress={saveChanges} style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                </View>
            )}
        </BottomSheetView>
    );
};
// Memoize component to prevent unnecessary re-renders
export default React.memo(VerificationReviewSheet);

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
        maxWidth: "90%",
    },
    textBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: "80%",
    },
    textInput: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 18,
        bottom: 4,
        maxWidth: "80%",
        minWidth: "10%",
    },
    editIcon: {
        marginLeft: 5
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
});
