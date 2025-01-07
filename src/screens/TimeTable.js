import React, { useRef, useState, useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SelectingClass from "../components/SelectingClass";
import VerificationInput from "../components/VerificationInput";
import GradeInput from "../components/GradeInput";

export default function TimeTable({darkThemeEnabled, addGrade, addVerification, selectedClass, setSelectedClass, toggleMaturity, maturityIsEnabled}) {

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

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleGradeInput = (event) => {
        console.log(event.start.dateTime);
        // {"_internal":
        //     {"columnSpan": 1, "duration": 90, "endUnix": 1736948100000, "index": 0, "resourceIndex": undefined, "startMinutes": 785, "startUnix": 1736942700000, "total": 1},
        //     "class": "I2a", "classroom": "203", "color": "#6089d6",
        //     "end":{"dateTime": "2025-01-15T14:35:00"},
        //     "id": "194", "localId": "194", "maturity": true,
        //     "start": {"dateTime": "2025-01-15T13:05:00"}, "subject": "m293", "teacher": "GeG", "title": "GeG m293"
        // }

        if (!selectedClass) return;
        setSelectedEvent(event);
        gradeSheetRef.current?.present();
    };

    const handleVerificationInput = (event) => {
        if (!selectedClass) return;
        setSelectedEvent(event);
        verificationSheetRef.current?.present();
    };

    const handleSaveText = (text) => {
        if (selectedEvent) {
            addVerification({ ...selectedEvent, text });
        }
        verificationSheetRef.current?.close();
    };

    const onCancel = () => {
        verificationSheetRef.current?.close();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Calendar
                        darkThemeEnabled={darkThemeEnabled}
                        onPressEvent={handleGradeInput}
                        onLongPressEvent={handleVerificationInput}
                        selectedClass={selectedClass}
                    />
                    <VerificationInput
                        bottomSheetRef={verificationSheetRef}
                        darkThemeEnabled={darkThemeEnabled}
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                        onSave={handleSaveText}
                        onCancel={onCancel}
                    />
                    <SelectingClass
                        bottomSheetRef={selectClassSheetRef}
                        selectedClass={selectedClass}
                        setSelectedClass={setSelectedClass}
                        darkThemeEnabled={darkThemeEnabled}
                        toggleMaturity={toggleMaturity}
                        maturityIsEnabled={maturityIsEnabled}
                    />
                    <GradeInput
                        gradeSheetRef={gradeSheetRef}
                        darkThemeEnabled={darkThemeEnabled}
                        onCancel={() => gradeSheetRef.current?.close()}
                        lessonTitle={selectedEvent?.title}
                        lessonTime={selectedEvent?.start.dateTime}
                        addGrade={addGrade}
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
