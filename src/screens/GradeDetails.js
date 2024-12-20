import React, {useMemo, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions, Pressable} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import GradeInput from "../components/GradeInput";

export default function GradeDetails({ route, darkThemeEnabled, handleAddGrade, grades, handleDeleteGrade}) {

    const { lessonTitle } = route.params;

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const gradeSheetRef = useRef(null);

    useEffect(() => {
        if (route.params?.showSheet) {
            gradeSheetRef.current?.present();
        }
    }, [route.params?.showSheet]);

    const handleAddNewGrade = (lessonTitle, newGrade) => {
        handleAddGrade(lessonTitle, newGrade);
        gradeSheetRef.current?.close();
    };

    const renderGradeItem = ({ item }) => (
                <View style={styles.gradeItem}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.pressable,
                            pressed && styles.pressedItem
                        ]}
                        onLongPress={() => handleDeleteGrade(lessonTitle, item)}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                        <View style={styles.gradeContainer}>
                            <Text style={styles.gradeText}>Nota: {item.grade}</Text>
                        </View>
                    </Pressable>
                </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <FlatList
                        data={grades}
                        renderItem={renderGradeItem}
                        keyExtractor={(_, index) => index.toString()}
                    />
                    <GradeInput
                        gradeSheetRef={gradeSheetRef}
                        darkThemeEnabled={darkThemeEnabled}
                        onCancel={() => gradeSheetRef.current?.dismiss()}
                        lessonTitle={lessonTitle}
                        addGrade={handleAddNewGrade}
                    />
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
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
        borderRadius: 10,
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
