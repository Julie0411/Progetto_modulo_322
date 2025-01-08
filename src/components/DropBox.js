import {StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

export const DropBox = ({darkThemeEnabled, selectClass}) => {
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const [value, setValue] = useState(null);

    const [, setIsFocus] = useState(false);

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            containerStyle={styles.containerStyle}
            itemContainerStyle={styles.itemContainerStyle}
            itemTextStyle={styles.itemTextStyle}
            data={[
                {label: 'I2a', value: '1'},
                {label: 'I2b', value: '2'},
                {label: 'I2c', value: '3'}
            ]}
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
            labelField={"label"}
            valueField={"value"}
            placeholder={'Scegli la sua classe'}
            searchPlaceholder={"Ricerca…"}
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
