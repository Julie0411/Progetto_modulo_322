import {Dimensions, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useMemo} from "react";
import {EVENTS} from "../constants/events";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from '@react-navigation/native';
import * as Haptics from "expo-haptics";

export default function Grades({darkThemeEnabled, maturityIsEnabled, selectedClass, grades}) {
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const navigation = useNavigation();

    const lessons = [...new Set(EVENTS.filter(event => {
        if (!selectedClass?.label) return false;

        if (maturityIsEnabled) {
            return event.maturity === true;
        } else {
            return event.class === selectedClass.label;
        }
    }).map(event => event.title))];

    const lessonsWithGrades = useMemo(() => {
        return lessons.map(title => ({
            title: title,
            grades: grades.find(grade => grade.title === title)?.grades || []
        }));
    }, [lessons, grades]);

    const calculateAverageGrade = (grades) => {
        if (!grades || grades.length === 0) return '--';
        const sum = grades.reduce((acc, curr) => acc + curr.grade, 0);
        return (sum / grades.length).toFixed(1);
    };

    const handleLessonSelection = (selectedLesson) => {
        const subjectGrades = grades.find(grade => grade.title === selectedLesson) || {grades: []};

        navigation.navigate('GradeDetails', {
            lessonTitle: selectedLesson,
            grades: subjectGrades.grades,
            darkThemeEnabled: darkThemeEnabled
        });
    };

    const renderItem = ({item}) => {

        const lessonGrades = lessonsWithGrades.find(lesson => lesson.title === item)?.grades;

        const average = calculateAverageGrade(lessonGrades);

        return (
            <View style={styles.itemContainer}>
                <Pressable
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                        handleLessonSelection(item)
                    }}
                    style={({pressed}) => [styles.pressable, pressed && styles.pressedItem]}
                >
                    <View style={styles.leftSection}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                    <View style={styles.centerSection}>
                        <Text style={styles.itemText}>Nota media: {average}</Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Ionicons name="chevron-forward-outline" size={24}
                                  color={darkThemeEnabled ? 'white' : 'black'}/>
                    </View>
                </Pressable>
            </View>
        );
    };

    return (

        <View style={styles.container}>
            {!lessonsWithGrades.filter(lesson => lesson.grades.length > 0).length ? (
                <Text style={styles.textHolder}>Non c’è nessuna nota</Text>
            ) : (
                <FlatList
                    data={lessonsWithGrades.filter(lesson => lesson.grades.length > 0).map(lesson => lesson.title)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                />
            )}
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
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        width: Dimensions.get("window").width - 20,
        height: 60,
    },
    itemText: {
        color: darkThemeEnabled ? 'white' : 'black',
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,

    },
    pressedItem: {
        backgroundColor: 'rgba(155,155,155,0.3)',
    },
    leftSection: {
        flex: 1,
    },
    centerSection: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 20,
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    textHolder: {
        color: darkThemeEnabled ? 'white' : 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
    },

})
