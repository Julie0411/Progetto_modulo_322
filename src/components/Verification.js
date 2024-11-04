import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useStyles } from "../utils/hooks/useStyles";
import dateFormatter from "../utils/formatters/dateFormatter";

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
                <Text style={styles.text} numberOfLines={1}>
                    {dateFormatter.formatDate(item.data.dateTime)}
                </Text>
            </Pressable>
        </View>
    );
};

export default Verification;
