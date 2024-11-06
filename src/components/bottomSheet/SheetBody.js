import React, { useState, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import {formatDate} from "../../utils/formatters/dateFormatter";

const SheetBody = ({ darkThemeEnabled, item, setItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('');
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    if (!item) return null;

    const [firstPart, roomPart] = item.title.split('\n');
    const [insegnante, ...lezioneParts] = firstPart.split(" ");
    const lezione = lezioneParts.join(" ");

    const toggleEdit = () => {
        setEditedText(item.text);
        setIsEditing(!isEditing);
    };

    const saveChanges = () => {
        setItem({ ...item, text: editedText });
        setIsEditing(false);
    };

    return (
        <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.text}>Lezzione: {lezione}</Text>
            <Text style={styles.text}>Insegnante: {insegnante}</Text>
            <Text style={styles.text}>Aula: {roomPart}</Text>
            <Text style={styles.text}>Data: {formatDate(item.data.dateTime)}</Text>
            <View style={styles.textBody}>
                <Text style={styles.text}>Appunti: </Text>
                {isEditing ? (
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
                    <Text style={styles.text}>{item.text}</Text>
                )}
                <Pressable onPress={isEditing ? null : toggleEdit} style={styles.editIcon}>
                    <FontAwesome
                        name="pencil"
                        size={20}
                        color={darkThemeEnabled ? 'white' : 'black'}
                    />
                </Pressable>
            </View>
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

export default React.memo(SheetBody);

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    contentContainer: {
        backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
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
