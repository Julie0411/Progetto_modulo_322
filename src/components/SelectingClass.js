import React, {useContext, useMemo} from "react";
import {StyleSheet} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBackdrop from "./bottomSheet/CustomBackdrop";
import SelectClassSheet from "../components/bottomSheet/SelectClassSheet";
import {ThemeContext} from "../context/ThemeContext";

export default function SelectingClass({bottomSheetRef}) {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const selectSnapPoints = useMemo(() => ["35%"], []);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={selectSnapPoints}
            enablePanDownToClose={false}
            keyboardBehavior="interactive"
            handleStyle={styles.handleStyle}
            backdropComponent={CustomBackdrop}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            backgroundStyle={{backgroundColor: darkThemeEnabled ? 'black' : 'white'}}
        >
            <SelectClassSheet bottomSheetRef={bottomSheetRef}/>
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
