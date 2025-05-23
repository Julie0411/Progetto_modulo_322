import React, {useContext, useMemo, useState} from "react";
import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {DropBox} from "../DropBox";
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../../context/ThemeContext";
import {ClassContext} from "../../context/ClassContext";
// VerificationInputSheet component for handling verification note inputs
const SelectClassSheet = ({bottomSheetRef}) => {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const { setSelectedClass,maturityIsEnabled,toggleMaturity } = useContext(ClassContext);


    const [selClass, setSelClass] = useState(null);

    const handleSavePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        setSelectedClass({...selClass, maturityIsEnabled});
        bottomSheetRef.current.close();
    };

    return (
        <BottomSheetView style={styles.contentContainer}>
            <DropBox selectClass={setSelClass}/>
            <View style={styles.toggle}>
                <Text style={styles.toggleText}>Maturità</Text>
                <Switch onValueChange={toggleMaturity} value={maturityIsEnabled}/>
            </View>
            <View style={[styles.buttonContainer, !selClass && styles.buttonDisabled]}>
                <Pressable style={styles.button} onPress={handleSavePress} disabled={!selClass}>
                    <Text style={styles.buttonText}>Salva</Text>
                </Pressable>
            </View>
        </BottomSheetView>
    );
};

export default React.memo(SelectClassSheet);

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    contentContainer: {
        backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 10,
    },
    toggleText: {
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',
        paddingRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'gray',
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.5
    },
    buttonText: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 16,
    },
    buttonDisabled: {
        opacity: 0.5,
    }
});
