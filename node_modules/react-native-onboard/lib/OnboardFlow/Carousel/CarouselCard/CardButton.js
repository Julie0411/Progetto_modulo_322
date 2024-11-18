import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLOR_BUTTON_DEFAULT } from '../../constants';
export const CardButton = ({ style, text, textStyle, onPress, }) => {
    return (<TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOR_BUTTON_DEFAULT,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 100,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 12,
    },
    buttonText: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
    },
});
