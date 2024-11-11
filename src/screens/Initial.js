// Import required dependencies from React and React Native
import React, {useState} from 'react';
import {Pressable, StyleSheet, View, Text, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from "../utils/hooks/useStyles";
import { DropBox } from "../components/DropBox";

const Initial = ({ darkThemeEnabled, selectedClass }) => {
    // Get styles using custom hook
    const styles = useStyles(createStyles, darkThemeEnabled);
    // Navigation hook
    const navigation = useNavigation();
    // State for maturity toggle
    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);
    // Toggle handler for maturity switch
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);
    // Navigation handler
    const onPress = () => {
        navigation.navigate('TabNavigator');
    };
    const [objectSelected, setObjectSelected] = useState(true);
    const handleClassSelection = (item) => {
        setObjectSelected(true);
        selectedClass(item);
    };

    // Component render with:
    // - Title section
    // - Dropdown for class selection
    // - Maturity toggle switch
    // - Continue button (disabled when no value selected)
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text}>textToDo</Text>
            </View>
            <DropBox darkThemeEnabled={darkThemeEnabled} handleClassSelection={handleClassSelection}/>
            <View style={styles.toggle}>
                <Text style={styles.toggleText}>Maturità</Text>
                <Switch onValueChange={toggleMaturity} value={maturityIsEnabled} />
            </View>
            <Pressable disabled={!objectSelected} onPress={onPress}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.button}>Сontinuare</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Initial;

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%',
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginBottom: 20
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
    text:{
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',
    }
})
