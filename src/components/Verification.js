// Import necessary React and React Native components
import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useStyles } from "../utils/hooks/useStyles";
import {formatDate} from "../utils/formatters/dateFormatter";

// Verification component that displays a pressable item with title and date
// Props:
// - item: contains title and date data
// - darkThemeEnabled: boolean for theme switching
// - press: function handler for press event
// - longPress: function handler for long press event
const Verification = ({ item, darkThemeEnabled, press, longPress }) => {
    // Get styles based on current theme
    const styles = useStyles(createStyles, darkThemeEnabled);

    return (
        <View style={styles.container}>
            <Pressable
                onLongPress={longPress}
                onPress={press}
                // Dynamic style based on pressed state
                style={({ pressed }) => [styles.pressable, pressed && styles.pressedItem]}
            >
                {/* Display item title with single line truncation */}
                <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
                {/* Display formatted date with single line truncation */}
                <Text style={styles.text} numberOfLines={1}>
                    {formatDate(item.data.dateTime)}
                </Text>
            </Pressable>
        </View>
    );
};

export default Verification;

// Style creation function that receives colors from theme
const createStyles = (colors) => StyleSheet.create({
    // Container styles for the main wrapper
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
    // Styles for the pressable element
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    // Text styles with color from theme
    text: {
        color: colors.text,
        flexShrink: 1,
        marginRight: 10,
    },
    // Style applied when item is pressed
    pressedItem: {
        backgroundColor: colors.surface,
    }
});
