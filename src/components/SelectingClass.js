import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SelectClassSheet from "../components/bottomSheet/SelectClassSheet";
// Main TimeTable component that handles calendar and verification input
export default function SelectingClass({darkThemeEnabled, setSelectedClass, selectedClass, bottomSheetRef, toggleMaturity, maturityIsEnabled}) {

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const selectSnapPoints = useMemo(() => ["40%"], []);

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
                toggleMaturity={toggleMaturity}
                maturityIsEnabled={maturityIsEnabled}
                bottomSheetRef={bottomSheetRef}
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
