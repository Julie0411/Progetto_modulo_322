import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { HORIZONTAL_PADDING_DEFAULT } from '../../constants';
import { InputField } from '../../components/InputField';
import { TextStack } from '../../components/TextStack';
export const FormEntryPage = ({ style, titleStyle, subtitleStyle, textStyle, pageData, formElementTypes, currentPage, totalPages, goToNextPage, goToPreviousPage, onSaveData, textAlign, width, primaryColor, secondaryColor, props, canContinue, setCanContinue, pageIndex, }) => {
    const [errorFieldIds, setErrorFieldIds] = useState(new Set());
    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (currentPage == pageIndex) {
            if (errorFieldIds.size > 0) {
                setCanContinue(false);
            }
            else {
                setCanContinue(true);
            }
        }
    }, [errorFieldIds, currentPage]);
    return (<View style={[
            styles.container,
            {
                width: width,
                paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
            },
            style,
        ]}>
      <KeyboardAvoidingView>
        <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign} titleStyle={titleStyle} subtitleStyle={subtitleStyle}/>
        <ScrollView>
          {props.fields.map((input, index) => {
            const [hasError, setHasError] = useState(false);
            useEffect(() => {
                if (hasError) {
                    const set = errorFieldIds;
                    set.add(input.id ?? index);
                    setErrorFieldIds(new Set(set));
                }
                else {
                    const set = errorFieldIds;
                    set.delete(input.id ?? index);
                    setErrorFieldIds(new Set(set));
                }
            }, [hasError]);
            const handleSaveData = (data) => {
                formData[input.id ?? index + ''] = data;
                setFormData(formData);
                if (onSaveData) {
                    onSaveData({
                        source: pageData,
                        data: formData,
                    });
                }
            };
            const autoFocus = index == 0 && currentPage == pageIndex;
            return (<View key={index}>
                {input.type && formElementTypes[input.type] ? (formElementTypes[input.type]({
                    onSetText: (text) => {
                        if (onSaveData) {
                            onSaveData({
                                source: pageData,
                                data: {
                                    id: input.id,
                                    value: text,
                                },
                            });
                        }
                        if (input.onSetText) {
                            input.onSetText(text);
                        }
                    },
                    onSaveData: handleSaveData,
                    label: input.label,
                    placeHolder: input.placeHolder,
                    type: input.type,
                    getErrorMessage: input.getErrorMessage,
                    isRequired: input.isRequired,
                    prefill: input.prefill,
                    id: input.id,
                    primaryColor: primaryColor,
                    secondaryColor: secondaryColor,
                    canContinue: canContinue,
                    setCanContinue: setCanContinue,
                    backgroundColor: style ? StyleSheet.flatten(style)?.backgroundColor : '#FFFFFF',
                    setHasError: setHasError,
                    autoFocus: autoFocus,
                    currentPage: currentPage,
                    totalPages: totalPages,
                    pageIndex: pageIndex,
                    props: input.props,
                })) : (<InputField onSetText={(text) => {
                        if (onSaveData) {
                            onSaveData({
                                source: pageData,
                                data: {
                                    id: input.id,
                                    value: text,
                                },
                            });
                        }
                        if (input.onSetText) {
                            input.onSetText(text);
                        }
                    }} onSaveData={handleSaveData} primaryColor={primaryColor} secondaryColor={secondaryColor} textStyle={textStyle} canContinue={canContinue} setCanContinue={setCanContinue} setHasError={setHasError} backgroundColor={style ? StyleSheet.flatten(style)?.backgroundColor : '#FFFFFF'} autoFocus={autoFocus} currentPage={currentPage} pageIndex={pageIndex} totalPages={totalPages} {...input}/>)}
              </View>);
        })}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});
