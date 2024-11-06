import React, { useState } from 'react';
import {Pressable, StyleSheet, View, Text, Switch} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from "../utils/hooks/useStyles";
import {INITIAL_CONFIG} from "../constants/const";

const data = [
    { label: 'I2a', value: '1' },
    { label: 'I2b', value: '2' },
    { label: 'I2c', value: '3' },
];

export default function Initial(props) {
    const darkThemeEnabled = props.darkThemeEnabled;
    const styles = useStyles(createStyles, darkThemeEnabled);
    const [value, setValue] = useState(null);
    const [, setIsFocus] = useState(false);
    const navigation = useNavigation();
    const [maturityIsEnabled, setMaturityIsEnabled] = React.useState(false);
    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);

    const onPress = () => {
        navigation.navigate('TabNavigator');

    };
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.text}>Scegli la sua classe</Text>
                </View>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.containerStyle}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={data}
                    search
                    activeColor={darkThemeEnabled ? 'black' : 'white'}
                    maxHeight={300}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    {...INITIAL_CONFIG}
                />
                <View style={styles.toggle}>
                    <Text style={styles.toggleText}>Maturità</Text>
                    <Switch onValueChange={toggleMaturity} value={maturityIsEnabled} />
                </View>
                <Pressable  disabled={value === null} onPress={onPress}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.button}>Сontinuare</Text>
                    </View>
                </Pressable>
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
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginBottom: 20
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: darkThemeEnabled ? 'black' : 'white',

    },
    icon: {
        marginRight: 5,
        color: darkThemeEnabled ? 'white' : 'black',
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        paddingHorizontal: 8,
        fontSize: 14,
        borderWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: darkThemeEnabled ? 'white' : 'black',

    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,
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
})
