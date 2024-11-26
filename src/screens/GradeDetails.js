import React, {useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions, Pressable} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

export default function GradeDetails({ route }) {

    const { grades, darkThemeEnabled, showAddGrade} = route.params;

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const renderGradeItem = ({ item }) => (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.gradeItem}>
                    <Pressable
                        // Dynamic style based on pressed state
                        style={({ pressed }) => [styles.pressable, pressed && styles.pressedItem]}
                    >
                        <Text style={[styles.text, { color: darkThemeEnabled ? 'white' : 'black' }]}>
                            {item.text}
                        </Text>
                        <Text style={[styles.text, { color: darkThemeEnabled ? 'white' : 'black' }]}>
                            Grade: {item.grade}
                        </Text>
                    </Pressable>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );

    return (
        <View style={[styles.container, { backgroundColor: darkThemeEnabled ? 'black' : 'white' }]}>
            <FlatList
                data={grades}
                renderItem={renderGradeItem}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    );
}

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradeItem: {
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
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
        flexShrink: 1,
        marginRight: 10,
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    pressedItem: {
        backgroundColor: 'rgba(155,155,155,0.3)',
    }
});
