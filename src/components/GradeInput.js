import React, {useMemo} from "react";
import {StyleSheet} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBackdrop from "./bottomSheet/CustomBackdrop";
import GradeInputSheet from "./bottomSheet/GradeInputSheet";

export default function GradeInput({darkThemeEnabled, onCancel, subjectTitle, addGrade, gradeSheetRef, lessonTime}) {
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const selectSnapPoints = useMemo(() => ["45%"], []);

    return (
        <BottomSheetModal
            ref={gradeSheetRef}
            snapPoints={selectSnapPoints}
            enablePanDownToClose={true}
            keyboardBehavior="interactive"
            backdropComponent={CustomBackdrop}
            handleStyle={styles.handleStyle}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            backgroundStyle={{backgroundColor: darkThemeEnabled ? 'black' : 'white'}}
        >
            <GradeInputSheet
                darkThemeEnabled={darkThemeEnabled}
                onCancel={onCancel}
                subjectTitle={subjectTitle}
                lessonTime={lessonTime}
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
