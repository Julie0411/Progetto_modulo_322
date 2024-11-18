import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_MUTED_TEXT_DEFAULT, HORIZONTAL_PADDING_DEFAULT, TEXT_ALIGN_DEFAULT, VERTICAL_PADDING_DEFAULT, } from '../../constants';
import { OTPInput } from '../../components/OTPInput';
import { TextStack } from '../../components/TextStack';
export const PhoneNumberVerificationPage = ({ style, titleStyle, subtitleStyle, textStyle, pageData, currentPage, totalPages, goToNextPage, goToPreviousPage, textAlign = TEXT_ALIGN_DEFAULT, width, props, canContinue, setCanContinue, }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const maximumLength = props.codeLength ?? 6;
    async function onChangeVerificationCode(text) {
        setVerificationCode(text);
        if (props.onSetVerificationCode && props.codeLength && text.length === maximumLength) {
            const result = props.onSetVerificationCode(text);
            setIsInvalid(!result);
        }
    }
    return (<View style={[
            styles.container,
            { paddingHorizontal: HORIZONTAL_PADDING_DEFAULT },
            style,
            { width: width },
        ]}>
      <KeyboardAvoidingView>
        <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign} titleStyle={titleStyle} subtitleStyle={subtitleStyle}></TextStack>
        <OTPInput textStyle={textStyle} style={{
            marginTop: VERTICAL_PADDING_DEFAULT * 2,
        }} code={verificationCode} maximumLength={maximumLength} setIsPinReady={() => { }} setCode={(code) => {
            onChangeVerificationCode(code);
        }}/>
        <TouchableOpacity onPress={props.onResendVerificationCode}>
          <Text style={[
            styles.resendText,
            { color: COLOR_MUTED_TEXT_DEFAULT, marginTop: VERTICAL_PADDING_DEFAULT },
        ]}>
            {props.resendCodeText ?? `Resend code`}
          </Text>
        </TouchableOpacity>
        {isInvalid ? (<Text style={[textStyle, styles.errorText]}>
            {props.invalidCodeText ?? 'Invalid code'}
          </Text>) : null}
      </KeyboardAvoidingView>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    resendText: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'left',
    },
});
