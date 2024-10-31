import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useState} from "react";

const SheetBody = (props) => {
    const styles = StyleSheet.create({
        contentContainer: {
            backgroundColor: props.darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 20,
            alignItems: 'baseline',
            gap: 20
        },
        text: {
            color: props.darkThemeEnabled ? 'white' : 'black',
            fontSize: 18,
            maxWidth: "90%",

        },
        textBody:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxWidth: "80%",
        },
        textInput: {
            color: props.darkThemeEnabled ? 'white' : 'black',
            fontSize: 18,
            bottom:4,
            maxWidth: "80%",
        },
        editIcon: {
            marginLeft: 5
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
        },
        button:{
            borderWidth: 1,
            borderColor: props.darkThemeEnabled ? 'white' : 'black',
            marginTop: 10,
            borderRadius: 10,
            padding: 5,
            paddingRight: 20,
            paddingLeft: 20,
        },
        buttonText: {
            color: props.darkThemeEnabled ? 'white' : 'black',
            fontSize: 16,
        },
    })
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long' }).format(date);
        return formattedDate.slice(0,2)+formattedDate.charAt(2).toUpperCase()+formattedDate.slice(3);
    };
    const title = props.item.title;
    const [firstPart, roomPart] = title.split('\n');
    const [insegnante, ...lezioneParts] = firstPart.split(" ");
    const lezione = lezioneParts.join(" ");

    function toggleEdit() {
        setEditedText(props.item.text);
        setIsEditing(!isEditing);
    }

    function saveChanges() {
        if (props.item) {
            props.item.text = editedText;
            props.setItem({ ...props.item });
        }
        setIsEditing(false);
    }

    return(
        <BottomSheetView style={styles.contentContainer}>
        {props.item && (
            <>
                <Text style={styles.text}>Lezzione: {lezione}</Text>
                <Text style={styles.text}>Insegnante: {insegnante}</Text>
                <Text style={styles.text}>Aula: {roomPart}</Text>
                <Text style={styles.text}>Data: {formatDate(props.item.data.dateTime)}</Text>
                <View style={styles.textBody}>
                    <Text style={styles.text}>Appunti: </Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.textInput}
                            value={editedText}
                            onChangeText={setEditedText}
                            onSubmitEditing={saveChanges}
                            autoFocus
                            multiline={true}
                        />
                    ) : (
                        <Text style={styles.text}>{props.item.text}</Text>
                    )}
                    <Pressable onPress={isEditing? null:toggleEdit} style={styles.editIcon}>
                        <FontAwesome name="pencil" size={20} color={props.darkThemeEnabled ? 'white' : 'black'} />
                    </Pressable>
                </View>
                {isEditing && [
                    <View style={styles.buttons}>
                        <Pressable onPress={toggleEdit} style={styles.button}>
                            <Text style={[styles.buttonText,{color: 'red'}]}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={saveChanges} style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Pressable>
                    </View>
                    ]
                }
            </>
        )}
    </BottomSheetView>
    )
}

export default SheetBody;
