import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useStyles} from "../utils/hooks/useStyles";

const data = [
    { label: 'Nessuno', value: '1' },
    { label: 'I2a', value: '2' },
];

export default function Initial(props){
    const darkThemeEnabled = props.darkThemeEnabled;
    const styles = useStyles(createStyles, darkThemeEnabled);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>
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
    },
    container: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        padding: 16,
        width: '100%',
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
        color: darkThemeEnabled ? 'white' : 'black',
    },
    label: {
        position: 'absolute',
        backgroundColor: darkThemeEnabled ? 'white' : 'black',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
    },
})



