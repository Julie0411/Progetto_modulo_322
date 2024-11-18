import {Text, View, StyleSheet, FlatList, Dimensions} from "react-native";
import React, {useMemo} from "react";
import {EVENTS} from "../constants/events";
import {darkColors} from "../theme/colors/dark";
import {lightColors} from "../theme/colors/light";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Grades({darkThemeEnabled}) {
    const colors = darkThemeEnabled ? darkColors : lightColors;
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const uniqueTitles = [...new Set(EVENTS.map(event => event.title))];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <Text style={styles.itemText}>Nota media: --</Text>
            <View style={styles.itemText}>
                <Ionicons name={'pencil-outline'} size={20} color={darkThemeEnabled ? 'white' : 'black'} />

            </View>

        </View>
    );
    // Render component with theme-aware styling
    return (
        <View style={styles.container}>
            <FlatList
                data={uniqueTitles}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
        </View>
    );
}

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20,
        borderRadius: 5,
        overflow: 'hidden',
        width: Dimensions.get("window").width - 20,
        height: 60,
    },
    itemText: {
        color: darkThemeEnabled ? 'white' : 'black',
        flexShrink: 1,
        marginLeft: 20,
        marginRight: 20,
    },
})
