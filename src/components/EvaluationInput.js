import React, {useContext, useMemo} from "react";
import {StyleSheet} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBackdrop from "./bottomSheet/CustomBackdrop";
import EvaluationInputSheet from "./bottomSheet/EvaluationInputSheet";
import {ThemeContext} from "../context/ThemeContext";

export default function EvaluationInput({selectedEvent, setSelectedEvent, onSave, onCancel, bottomSheetRef}) {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const evaluationSnapPoints = useMemo(() => ["35%"], []);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={evaluationSnapPoints}
            enablePanDownToClose={true}
            keyboardBehavior="interactive"
            handleStyle={styles.handleStyle}
            backdropComponent={CustomBackdrop}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            backgroundStyle={{backgroundColor: darkThemeEnabled ? 'black' : 'white'}}
        >
            <EvaluationInputSheet
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
