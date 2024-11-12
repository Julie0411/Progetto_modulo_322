import {Text, View, StyleSheet} from "react-native";
import React from "react";
import {useStyles} from "../utils/hooks/useStyles";
// Main Grades component that receives props
export default function Grades(props){
    // Get dark theme state from props
    const darkThemeEnabled = props.darkThemeEnabled;
    // Initialize styles using custom hook
    const styles = useStyles(createStyles, darkThemeEnabled);
    // Render component with theme-aware styling
    return (
        <View style={styles.background}>
            <Text style={styles.text}>Note!</Text>
        </View>
    );
}

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    background: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 20
    }
})
