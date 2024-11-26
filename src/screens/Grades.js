import {Text, View, StyleSheet, FlatList, Dimensions, Pressable} from "react-native";
import React, {useMemo} from "react";
import {EVENTS} from "../constants/events";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

export default function Grades({darkThemeEnabled}) {

    const navigation = useNavigation();

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const lessons = [...new Set(EVENTS.map(event => event.title))];
    //Lessons with empty grades arrays
    const lessonsWithGrades = lessons.map(title => ({
        title: title,
        grades: []
    }));
    //Add a grade to a specific title
    const addGrade = (title, grade,text) => {
        const item = lessonsWithGrades.find(item => item.title === title);
        if (item) {
            item.grades.push({grade,text});
        }
    };

    addGrade("Kra m320", 5.5,"text1");
    addGrade("Kra m320", 5.0,"text2");

    console.log("!!lessonsWithGrades: ", lessonsWithGrades)
    console.log("!!lessonsWithGrades[0].grades: ",lessonsWithGrades[0].grades)

    const handleLessonSelection = (selectedLesson) => {
        navigation.navigate('GradeDetails', {
            lessonTitle: selectedLesson,
            grades: lessonsWithGrades.find(lesson => lesson.title === selectedLesson)?.grades || [],
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Pressable
                onPress={() => handleLessonSelection(item)}
                style={({ pressed }) => [styles.pressable, pressed && styles.pressedItem]}
            >
                <View style={styles.leftSection}>
                    <Text style={styles.itemText}>{item}</Text>
                </View>
                <View style={styles.centerSection}>
                    <Text style={styles.itemText}>Nota media: --</Text>
                </View>
                <View style={styles.rightSection}>
                    <Ionicons name="chevron-forward-outline" size={24} color={darkThemeEnabled ? 'white' : 'black'} />
                </View>
            </Pressable>
        </View>
    );

    // Render component with theme-aware styling
    return (
        <View style={styles.container}>
            <FlatList
                data={lessons}
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
    }

})
