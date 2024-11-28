import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import VerificationInputSheet from "./bottomSheet/VerificationInputSheet";
import CustomBackdrop from "./bottomSheet/CustomBackdrop";
// Main TimeTable component that handles calendar and verification input
export default function VerificationInput({ darkThemeEnabled, selectedEvent, setSelectedEvent, onSave, onCancel, bottomSheetRef}) {

    const verificationSnapPoints = useMemo(() => ["30%"], []);

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}  // Use the passed ref instead
            snapPoints={verificationSnapPoints}
            enablePanDownToClose={true}
            keyboardBehavior="interactive"
            handleStyle={styles.handleStyle}
            backdropComponent={CustomBackdrop}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            backgroundStyle={{ backgroundColor: darkThemeEnabled ? 'black' : 'white' }}
        >
            <VerificationInputSheet
                darkThemeEnabled={darkThemeEnabled}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                onSave={onSave}
                onCancel={onCancel}
            />
        </BottomSheetModal>
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
