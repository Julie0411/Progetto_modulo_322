import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SelectClassSheet from "../components/bottomSheet/SelectClassSheet";
// Main TimeTable component that handles calendar and verification input
export default function SelectingClass({darkThemeEnabled, setSelectedClass, selectedClass, bottomSheetRef}) {

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const selectSnapPoints = useMemo(() => ["40%"], []);

    const handleSavePress = () => bottomSheetRef.current?.close();

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={selectSnapPoints}
            enablePanDownToClose={false}
            keyboardBehavior="interactive"
            handleStyle={styles.handleStyle}
            handleIndicatorStyle={styles.handleIndicatorStyle}
        >
            <SelectClassSheet
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                darkThemeEnabled={darkThemeEnabled}
                handleSavePress={handleSavePress}
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
    // Handle indicator styling with theme support
    handleIndicatorStyle: {
        backgroundColor: darkThemeEnabled ? 'white' : 'black',
        marginTop: 5
    }
});
