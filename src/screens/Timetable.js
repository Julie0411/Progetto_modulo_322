// Import necessary React hooks and components
import React, { useRef, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Calendar from "../components/Calendar";
import VerificationInputSheet from "../components/bottomSheet/VerificationInputSheet";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Main Timetable component that handles calendar and verification input
export default function Timetable(props) {
    // Styles definition with dynamic theming support
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        // Bottom sheet handle styling with theme support
        handleStyle: {
            backgroundColor: props.darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        // Handle indicator styling with theme support
        handleIndicatorStyle: {
            backgroundColor: props.darkThemeEnabled ? 'white' : 'black',
            marginTop: 5
        }
    });

    // Destructure props
    const { darkThemeEnabled, addVerification } = props;

    // State for tracking selected calendar event
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Reference for bottom sheet modal
    const bottomSheetModalRef = useRef(null);

    // Memoized snap points for bottom sheet
    const snapPoints = useMemo(() => ["30%"], []);

    // Handler for when a calendar event is pressed
    const handleEventPress = (event) => {
        setSelectedEvent(event);
        bottomSheetModalRef.current?.present();
    };

    // Handler for saving verification text
    const handleSaveText = (text) => {
        if (selectedEvent) {
            addVerification({ ...selectedEvent, text });
        }
        bottomSheetModalRef.current?.close();
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
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
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
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
