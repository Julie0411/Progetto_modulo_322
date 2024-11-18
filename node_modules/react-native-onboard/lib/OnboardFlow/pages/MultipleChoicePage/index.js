import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { COLOR_TEXT_DEFAULT, HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT, } from '../../constants';
import { TextStack } from '../../components/TextStack';
const multipleChoiceElement = 'multipleChoiceElement';
export const MultipleChoicePage = ({ style, titleStyle, subtitleStyle, textStyle, pageData, currentPage, totalPages, goToNextPage, goToPreviousPage, onSaveData, textAlign, width, props, pageIndex, primaryColor, secondaryColor, formElementTypes, canContinue, setCanContinue, }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const maxChoices = props.maxChoices ?? 1;
    const minChoices = props.minChoices ?? 1;
    function updateCanContinue() {
        if (currentPage == pageIndex) {
            if (setCanContinue) {
                if (selectedOptions.length < minChoices || selectedOptions.length > maxChoices) {
                    setCanContinue(false);
                }
                else {
                    setCanContinue(true);
                }
            }
        }
    }
    useEffect(() => {
        updateCanContinue();
        if (onSaveData && currentPage == pageIndex) {
            onSaveData({ data: selectedOptions, source: pageData });
        }
    }, [selectedOptions]);
    useEffect(() => {
        updateCanContinue();
    }, [currentPage]);
    const Field = ({ id, title, subtitle, onUpdated }) => {
        // Create touchable opacity for each field and use field style
        const selected = selectedOptions.find((option) => option.id === id && option.title === title && option.subtitle === subtitle);
        return (<TouchableOpacity onPress={() => {
                if (!selected) {
                    if (maxChoices && selectedOptions.length >= maxChoices) {
                        return;
                    }
                    else {
                        setSelectedOptions([...selectedOptions, { id, title, subtitle, onUpdated }]);
                    }
                }
                else {
                    setSelectedOptions(selectedOptions.filter((option) => {
                        return !(option.id === id && option.title === title && option.subtitle === subtitle);
                    }));
                }
            }}>
        <View style={[
                styles.option,
                {
                    paddingVertical: VERTICAL_PADDING_DEFAULT,
                    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
                    marginTop: VERTICAL_PADDING_DEFAULT,
                },
                selected ? { borderColor: primaryColor } : { borderColor: secondaryColor },
            ]}>
          <Text style={[styles.optionTitle, textStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>);
    };
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
        {/* Map props.fields to <Input/> */}
        <ScrollView style={{ marginTop: VERTICAL_PADDING_DEFAULT }} contentContainerStyle={{ paddingBottom: 140 }}>
          {props.fields.map((input, index) => (<View key={index}>
              {formElementTypes[multipleChoiceElement] ? (formElementTypes[multipleChoiceElement]({
                onSaveData: onSaveData,
                label: input.title,
                placeHolder: '',
                type: '',
                id: input.id,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                canContinue: canContinue,
                setCanContinue: setCanContinue,
                currentPage: currentPage,
                pageIndex: pageIndex,
                totalPages: totalPages,
                props: {
                    ...input,
                    selectedOptions,
                    setSelectedOptions,
                    titleStyle,
                    subtitleStyle,
                    textStyle,
                    pageData,
                    currentPage,
                    totalPages,
                    goToNextPage,
                    goToPreviousPage,
                    onSaveData,
                    textAlign,
                    width,
                    props,
                    pageIndex,
                    primaryColor,
                    secondaryColor,
                    formElementTypes,
                    minChoices,
                    maxChoices,
                    canContinue,
                    setCanContinue,
                },
            })) : (<Field {...input}/>)}
            </View>))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>);
};
const styles = StyleSheet.create({
    optionTitle: {
        fontSize: 18,
        color: COLOR_TEXT_DEFAULT,
        width: '100%',
    },
    option: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 12,
        fontSize: 18,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});
