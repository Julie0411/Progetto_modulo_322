import React, {useMemo, useState} from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {INITIAL_CONFIG, CLASSES_OPTIONS} from "../constants/const";

export const DropBox = ({darkThemeEnabled, selectClass}) => {

    const [value, setValue] = useState(null);

    const [, setIsFocus] = useState(false);

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

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
                selectClass(item);
            }}

            {...INITIAL_CONFIG}
        />
    );
};

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
    },
    placeholderStyle: {
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',
    },
    inputSearchStyle: {
        height: 30,
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',
    },
    containerStyle: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        borderWidth: 0.4,
        borderRadius: 10,
        padding: 2,
    },
    itemTextStyle: {
        color: darkThemeEnabled ? 'white' : 'black',
    }
})
