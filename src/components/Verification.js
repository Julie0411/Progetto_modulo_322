import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useStyles } from "../utils/hooks/useStyles";
import {formatDate} from "../utils/formatters/dateFormatter";

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    text: {
        color: colors.text,
        flexShrink: 1,
        marginRight: 10,
    },
    pressedItem: {
        backgroundColor: colors.surface,
    }
});
