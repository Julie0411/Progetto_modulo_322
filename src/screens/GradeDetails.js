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
                        style={({ pressed }) => [
                            styles.pressable,
                            pressed && styles.pressedItem
                        ]}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                        <View style={styles.gradeContainer}>
                            <Text style={styles.gradeText}>Nota: {item.grade}</Text>
                        </View>
                    </Pressable>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );

    return (
        <View style={styles.container}>
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
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20,
        borderRadius: 5,
        width: Dimensions.get("window").width - 20,
        height: 60,
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    gradeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
    },
    gradeText: {
        color: darkThemeEnabled ? 'white' : 'black',
    },
    pressable: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    pressedItem: {
        backgroundColor: 'rgba(155,155,155,0.3)',
    }
});
