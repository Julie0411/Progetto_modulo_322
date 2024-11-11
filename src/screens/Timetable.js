// Import necessary React hooks and components
import React, { useRef, useState, useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import VerificationInputSheet from "../components/bottomSheet/VerificationInputSheet";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OnBoardingSheet from "../components/bottomSheet/SelectClassSheet";

// Main Timetable component that handles calendar and verification input
export default function Timetable({darkThemeEnabled, addVerification, selected, selectedClass}) {
    useEffect(() => {
        handleOnBoarding();
    }, []);
    // Styles definition with dynamic theming support
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        // Bottom sheet handle styling with theme support
        handleStyle: {
            backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        // Handle indicator styling with theme support
        handleIndicatorStyle: {
            backgroundColor: darkThemeEnabled ? 'white' : 'black',
            marginTop: 5
        }
    });

    // State for tracking selected calendar event
    const [selectedEvent, setSelectedEvent] = useState({});

    // Reference for bottom sheet modal
    const verificationSheetRef = useRef(null);

    // Reference for bottom sheet modal
    const selectClassSheetRef = useRef(null);

    // Memoized snap points for bottom sheet
    const vefificationSnapPoints = useMemo(() => ["30%"], []);

    // Memoized snap points for bottom sheet
    const selectSnapPoints = useMemo(() => ["40%"], []);

    // Handler for when a calendar event is pressed
    const handleEventPress = (event) => {
        setSelectedEvent(event);
        verificationSheetRef.current?.present();
    };

    // Handler for saving verification text
    const handleSaveText = (text) => {
        if (selectedEvent) {
            addVerification({ ...selectedEvent, text });
        }
        verificationSheetRef.current?.close();
    };

    const handleOnBoarding = () => {
        if (selectedEvent) {
            selectClassSheetRef.current?.present();
        }
    };

    return (
        // Gesture handler wrapper for bottom sheet functionality
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* Bottom sheet modal provider wrapper */}
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    {/* Calendar component */}
                    <Calendar
                        darkThemeEnabled={darkThemeEnabled}
                        addVerification={addVerification}
                        onEventPress={handleEventPress}
                    />
                    {/* Bottom sheet modal for verification input */}
                    <BottomSheetModal
                        ref={verificationSheetRef}
                        snapPoints={vefificationSnapPoints}
                        enablePanDownToClose={true}
                        keyboardBehavior="interactive"
                        handleStyle={styles.handleStyle}
                        handleIndicatorStyle={styles.handleIndicatorStyle}
                    >
                        {/* Verification input sheet component */}
                        <VerificationInputSheet
                            darkThemeEnabled={darkThemeEnabled}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            onSave={handleSaveText}
                        />
                    </BottomSheetModal>

                    {/* Bottom sheet modal for verification input */}
                    <BottomSheetModal
                        ref={selectClassSheetRef}
                        snapPoints={selectSnapPoints}
                        enablePanDownToClose={true}
                        keyboardBehavior="interactive"
                        handleStyle={styles.handleStyle}
                        handleIndicatorStyle={styles.handleIndicatorStyle}
                    >
                        {/* Verification input sheet component */}
                        <OnBoardingSheet selectedClass={selectedClass} selected={selected} darkThemeEnabled={darkThemeEnabled}/>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
