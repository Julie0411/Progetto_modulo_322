import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import Calendar from "../components/Calendar";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import SelectingClass from "../components/SelectingClass";
import VerificationInput from "../components/VerificationInput";
import GradeInput from "../components/GradeInput";
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../context/ThemeContext";
import {ClassContext} from "../context/ClassContext";
import {VerificationsContext} from "../context/VerificationsContext";

export default function TimeTable() {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const { selectedClass } = useContext(ClassContext);

    const { addVerification } = useContext(VerificationsContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!selectedClass) {
                selectClassSheetRef.current?.present();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [selectedClass]);

    const verificationSheetRef = useRef(null);

    const gradeSheetRef = useRef(null);

    const selectClassSheetRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleGradeInput = (event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (!selectedClass) return;
        setSelectedEvent(event);
        gradeSheetRef.current?.present();
    };

    const handleVerificationInput = (event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (!selectedClass) return;
        setSelectedEvent(event);
        verificationSheetRef.current?.present();
    };

    const handleSaveText = (text) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        if (selectedEvent) {
            addVerification({...selectedEvent, text});
        }
        verificationSheetRef.current?.close();
    };

    const onCancel = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        verificationSheetRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Calendar
                        onPressEvent={handleGradeInput}
                        onLongPressEvent={handleVerificationInput}
                        selectedClass={selectedClass}
                    />
                    <VerificationInput
                        bottomSheetRef={verificationSheetRef}
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
        marginTop: 5
    }
});
