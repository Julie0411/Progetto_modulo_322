// Import required dependencies from React and React Native
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {INITIAL_CONFIG, CLASSES_OPTIONS} from "../constants/const";

export const DropBox = ({darkThemeEnabled, selected, selectedClass}) => {
    // State for dropdown value
    const [value, setValue] = useState(selectedClass);
    // State for dropdown focus
    const [, setIsFocus] = useState(false);
    const selectedObject = (item) => {
        selected(item);
    };

    const styles = StyleSheet.create({
        dropdown: {
            width: '100%',
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            backgroundColor: darkThemeEnabled ? 'black' : 'white',
        },
        placeholderStyle: {
            fontSize: 16,
            color: darkThemeEnabled ? 'white' : 'black',
        },
        selectedTextStyle: {
            fontSize: 16,
            color: 'white',
        },
        inputSearchStyle: {
            height: 30,
            fontSize: 16,
            color: darkThemeEnabled ? 'white' : 'black',
        },
        containerStyle: {
            backgroundColor: darkThemeEnabled ? 'black' : 'white',
            borderWidth: 0.4,
            borderRadius: 8,
            padding: 2,
        },
        itemTextStyle: {
            color: darkThemeEnabled ? 'white' : 'black',
        }
    })
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            containerStyle={styles.containerStyle}
            itemContainerStyle={styles.itemContainerStyle}
            itemTextStyle={styles.itemTextStyle}
            data={CLASSES_OPTIONS}
            search
            activeColor={darkThemeEnabled ? 'black' : 'white'}
            maxHeight={300}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
                selectedObject(item);
            }}
            {...INITIAL_CONFIG}
        />
    );
};


