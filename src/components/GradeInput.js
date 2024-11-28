import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import GradeInputSheet from "./bottomSheet/GradeInputSheet";
import CustomBackdrop from "./bottomSheet/CustomBackdrop";
// Main TimeTable component that handles calendar and verification input
export default function GradeInput({ darkThemeEnabled, onCancel, lessonTitle, addGrade, gradeSheetRef}) {

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const selectSnapPoints = useMemo(() => ["50%"], []);

    return (
        <BottomSheetModal
            ref={gradeSheetRef}
            snapPoints={selectSnapPoints}
            enablePanDownToClose={true}
            keyboardBehavior="interactive"
            backdropComponent={CustomBackdrop}
            handleStyle={styles.handleStyle}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            backgroundStyle={{ backgroundColor: darkThemeEnabled ? 'black' : 'white' }}
        >
            <GradeInputSheet
                darkThemeEnabled={darkThemeEnabled}
                onCancel={onCancel}
                lessonTitle={lessonTitle}
                onSaveGrade={addGrade}
            />
        </BottomSheetModal>
    );
}

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
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
