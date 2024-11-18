import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants';
import { TextStack } from '../../components/TextStack';
export const PhoneNumberEntryPage = ({ style, titleStyle, subtitleStyle, textStyle, pageData, currentPage, totalPages, goToNextPage, goToPreviousPage, textAlign, width, props, canContinue, setCanContinue, }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    function onChangePhoneNumber(text) {
        var cleaned = ('' + text).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? '+1 ' : '', number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            setPhoneNumber(number);
            return;
        }
        setPhoneNumber(text);
        // TODO: Add validation
        if (props.onSetPhoneNumber) {
            props.onSetPhoneNumber(text);
        }
    }
    function getInput() {
        return (<>
        <TextInput onFocus={() => {
                setIsFocused(true);
            }} onBlur={() => setIsFocused(false)} value={phoneNumber} textContentType="telephoneNumber" dataDetectorTypes="phoneNumber" maxLength={18} placeholder={'Mobile number'} style={[
                styles.option,
                {
                    paddingVertical: VERTICAL_PADDING_DEFAULT,
                    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
                    marginTop: VERTICAL_PADDING_DEFAULT * 2,
                },
                textStyle,
                isFocused ? styles.optionSelected : null,
            ]} keyboardType="phone-pad" onChangeText={onChangePhoneNumber}/>
        {isInvalid ? (<Text style={[textStyle, styles.errorText]}>
            {props.invalidNumberText ?? 'Invalid phone number'}
          </Text>) : null}
      </>);
    }
    return (<View style={[
            styles.container,
            { paddingHorizontal: HORIZONTAL_PADDING_DEFAULT },
            style,
            { width: width },
        ]}>
      <KeyboardAvoidingView>
        <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign} titleStyle={titleStyle} subtitleStyle={subtitleStyle}></TextStack>
        {getInput()}
      </KeyboardAvoidingView>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    option: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 12,
        fontSize: 18,
    },
    optionSelected: {
        borderColor: '#000',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});
