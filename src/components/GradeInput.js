import React, {useContext, useMemo} from "react";
import {StyleSheet} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBackdrop from "./bottomSheet/CustomBackdrop";
import GradeInputSheet from "./bottomSheet/GradeInputSheet";
import {ThemeContext} from "../context/ThemeContext";

export default function GradeInput({onCancel, subjectTitle, gradeSheetRef, lessonTime}) {

    const { darkThemeEnabled } = useContext(ThemeContext);
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
                onCancel={onCancel}
                subjectTitle={subjectTitle}
                lessonTime={lessonTime}
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
