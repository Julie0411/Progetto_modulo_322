import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {formatDate} from "../utils/formatters/dateFormatter";
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dimensions, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../context/ThemeContext";
import {GradesContext} from "../context/GradesContext";

export default function GradeDetails({route}) {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const { grades, deleteGrade, sortAscending } = useContext(GradesContext);

    const {subjectTitle} = route.params;

    const gradeSheetRef = useRef(null);

    const sortedGrades = useMemo(() => {
        const subjectGrades = grades.filter(grade => grade.subject === subjectTitle);
        return [...subjectGrades].sort((a, b) => {
            const timeA = new Date(a.time).getTime();
            const timeB = new Date(b.time).getTime();
            return sortAscending ? timeA - timeB : timeB - timeA;
        });
    }, [grades, sortAscending, subjectTitle]);


    useEffect(() => {
        if (route.params?.showSheet) {
            gradeSheetRef.current?.present();
        }
    }, [route.params?.showSheet]);

    const renderGradeItem = ({item}) => (
        <View style={styles.gradeItem}>
            <Pressable
                style={({pressed}) => [
                    styles.pressable,
                    pressed && styles.pressedItem
                ]}
                onLongPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                    deleteGrade(item.id)
                }}
            >
                <View style={styles.leftSection}>
                    <Text style={styles.text}>{formatDate(item.time)}</Text>
                </View>
                <View style={styles.centerSection}>
                    <Text style={styles.gradeText}>Nota: {item.grade}</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </Pressable>
        </View>
    );

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <FlatList
                        data={sortedGrades}
                        renderItem={renderGradeItem}
                        keyExtractor={(item, index) => `${item.time}-${index}`}
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
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    }
});
