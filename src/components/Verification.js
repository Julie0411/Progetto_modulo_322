import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useStyles } from "../utils/hooks/useStyles";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long' }).format(date);
    return formattedDate.slice(0, 2) + formattedDate.charAt(2).toUpperCase() + formattedDate.slice(3);
};

const createStyles = (colors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        marginTop: 20,
        borderRadius: 5,
        overflow: 'hidden',
        width: Dimensions.get("window").width - 20,
        height: 60,
    },
    pressable: {
        flexDirection: 'row', // Set the Pressable to be a row as well
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1, // Allow it to grow and fill the container
        padding: 10,
    },
    text: {
        color: colors.text,
        flexShrink: 1, // Prevent the text from growing larger than its container
        marginRight: 10, // Add some space between the text items
    },
    pressedItem: {
        backgroundColor: colors.surface,
    }
});

const Verification = ({ item, darkThemeEnabled, press, longPress }) => {
    const styles = useStyles(createStyles, darkThemeEnabled);

    return (
        <View style={styles.container}>
            <Pressable
                onLongPress={longPress}
                onPress={press}
                style={({ pressed }) => [styles.pressable, pressed && styles.pressedItem]}
            >
                <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.text} numberOfLines={1}>{formatDate(item.data.dateTime)}</Text>
            </Pressable>
        </View>
    );
}

export default Verification;
