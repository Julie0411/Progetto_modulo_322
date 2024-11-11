// Import necessary React and React Native components
import React, {useMemo, useState} from "react";
import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {DropBox} from "../DropBox";

// VerificationInputSheet component for handling verification note inputs
const SelectClassSheet = ({darkThemeEnabled, selectedClass}) => {
    // Memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);
    const selected = () => {
    };
    // State for maturity toggle
    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);
    // Toggle handler for maturity switch
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);
    const handleClassSelection = (item) => {
        console.log(item);
    };
    const onPress = () => {
        console.log("pressed");
    };
    // Component render
    return (
    <BottomSheetView style={styles.contentContainer}>
        <DropBox darkThemeEnabled={darkThemeEnabled} selectedClass={selectedClass} selected={selected} handleClassSelection={handleClassSelection}/>
        <View style={styles.toggle}>
            <Text style={styles.toggleText}>Maturità</Text>
            <Switch onValueChange={toggleMaturity} value={maturityIsEnabled} />
        </View>
        {/* Container for action buttons */}
        <View style={styles.buttonContainer}>
            {/* Save button */}
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </View>
    </BottomSheetView>
    );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(SelectClassSheet);

// Style creation function based on theme
const createStyles = (darkThemeEnabled) => StyleSheet.create({
    // Main container styles
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
        borderRadius: 8,
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
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 10
    },
});
