import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import Calendar from "../components/Calendar";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import SelectingClass from "../components/SelectingClass";
import EvaluationInput from "../components/EvaluationInput";
import GradeInput from "../components/GradeInput";
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../context/ThemeContext";
import {ClassContext} from "../context/ClassContext";
import {EvaluationsContext} from "../context/EvaluationsContext";

export default function TimeTable() {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const { selectedClass } = useContext(ClassContext);

    const { addEvaluation } = useContext(EvaluationsContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!selectedClass) {
                selectClassSheetRef.current?.present();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [selectedClass]);

    const evaluationSheetRef = useRef(null);

    const gradeSheetRef = useRef(null);

    const selectClassSheetRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [currentMonth, setCurrentMonth] = useState(() => {
        const now = new Date();
        return now.toLocaleString('it-IT', { month: 'long', year: 'numeric' });
    });

    const handleGradeInput = (event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (!selectedClass) return;
        setSelectedEvent(event);
        gradeSheetRef.current?.present();
    };

    const handleEvaluationInput = (event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (!selectedClass) return;
        setSelectedEvent(event);
        evaluationSheetRef.current?.present();
    };

    const handleSaveText = (text) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (selectedEvent) {
            addEvaluation({...selectedEvent, text});
        }
        evaluationSheetRef.current?.close();
    };

    const handleDateChanged = (dateString) => {
        const date = new Date(dateString);
        const monthYear = date.toLocaleString('it-IT', { month: 'long', year: 'numeric' });
        setCurrentMonth(monthYear);
    };

    const onCancel = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        evaluationSheetRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Text style={styles.monthText}>{currentMonth}</Text>
                    <Calendar
                        onPressEvent={handleGradeInput}
                        onLongPressEvent={handleEvaluationInput}
                        selectedClass={selectedClass}
                        onDateChanged={handleDateChanged}
                    />
                    <EvaluationInput
                        bottomSheetRef={evaluationSheetRef}
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                        onSave={handleSaveText}
                        onCancel={onCancel}
                    />
                    <SelectingClass bottomSheetRef={selectClassSheetRef}/>
                    <GradeInput
                        gradeSheetRef={gradeSheetRef}
                        onCancel={() => gradeSheetRef.current?.close()}
                        subjectTitle={selectedEvent?.title}
                        lessonTime={selectedEvent?.start.dateTime}
                    />
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
    },
    handleStyle: {
        backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    handleIndicatorStyle: {
        backgroundColor: darkThemeEnabled ? 'white' : 'black',
        marginTop: 5,
    },
    monthText: {
        fontSize: 16,
        padding: 10,
        fontWeight: '500',
        textAlign: 'center',
        color: darkThemeEnabled ? '#FFFFFF' : '#000000',
        backgroundColor: darkThemeEnabled ? '#000000' : '#FFFFFF',
        textTransform: 'capitalize',
        letterSpacing: 0.5,
    },
});