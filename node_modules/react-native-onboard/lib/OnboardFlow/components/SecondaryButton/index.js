import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { VERTICAL_PADDING_DEFAULT } from '../../constants';
export const SecondaryButton = ({ currentPage, onPress, style, totalPages, text, disabled, textStyle, ...props }) => {
    return (<TouchableOpacity activeOpacity={0.6} style={[styles.button, disabled ? { opacity: 0.2 } : null, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 32,
        marginBottom: VERTICAL_PADDING_DEFAULT,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 16,
    },
});
