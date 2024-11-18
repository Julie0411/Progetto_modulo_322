import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_MUTED_TEXT_DEFAULT, COLOR_TEXT_DEFAULT, TEXT_ALIGN_DEFAULT, VERTICAL_PADDING_SMALL_DEFAULT, } from '../../constants';
export const TextStack = ({ title, subtitle, titleStyle, subtitleStyle, textStyle, textAlign, ...props }) => {
    return (<View>
            <Text style={[
            styles.title,
            {
                color: COLOR_TEXT_DEFAULT,
                marginBottom: VERTICAL_PADDING_SMALL_DEFAULT,
                textAlign: textAlign,
            },
            titleStyle,
        ]}>
                {title}
            </Text>
            <Text style={[
            styles.subtitle,
            {
                color: COLOR_MUTED_TEXT_DEFAULT,
                textAlign: TEXT_ALIGN_DEFAULT,
            },
            { textAlign: textAlign },
            subtitleStyle,
        ]}>
                {subtitle}
            </Text>
        </View>);
};
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '800',
        lineHeight: 42,
        width: '100%',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 26,
        width: '100%',
    },
});
