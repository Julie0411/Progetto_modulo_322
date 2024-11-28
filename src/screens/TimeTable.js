import React, { useRef, useState, useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SelectingClass from "../components/SelectingClass";
import VerificationInput from "../components/VerificationInput";

export default function TimeTable({darkThemeEnabled, addVerification, selectedClass, setSelectedClass, toggleMaturity, maturityIsEnabled}) {

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!selectedClass) {
                selectClassSheetRef.current?.present();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [selectedClass]);

    const verificationSheetRef = useRef(null);

    const selectClassSheetRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState({});

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const handleEventPress = (event) => {
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
                        onEventPress={handleEventPress}
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
