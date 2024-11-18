import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { PRIMARY_BUTTON_TEXT_DEFAULT, PRIMARY_BUTTON_TEXT_LAST_PAGE_DEFAULT } from '../constants';
export const Footer = ({ style, Components, paginationSelectedColor, paginationColor, currentPage, goToNextPage, pages, canContinue, setCanContinue, showFooter = true, primaryButtonStyle, primaryButtonTextStyle, ...props }) => {
    function getPrimaryButtonTitle() {
        if (pages && pages[currentPage] && pages[currentPage].primaryButtonTitle) {
            return pages[currentPage].primaryButtonTitle;
        }
        return pages?.length - 1 === currentPage
            ? PRIMARY_BUTTON_TEXT_LAST_PAGE_DEFAULT
            : PRIMARY_BUTTON_TEXT_DEFAULT;
    }
    const totalPages = pages?.length ?? 0;
    return (<KeyboardAvoidingView behavior="position" style={[style]} {...props}>
      <Components.PaginationComponent paginationColor={paginationColor} paginationSelectedColor={paginationSelectedColor} currentPage={currentPage} totalPages={totalPages}/>
      <Components.PrimaryButtonComponent text={getPrimaryButtonTitle()} currentPage={currentPage} totalPages={totalPages} goToNextPage={goToNextPage} disabled={!canContinue} style={primaryButtonStyle} textStyle={primaryButtonTextStyle}/>
    </KeyboardAvoidingView>);
};
const styles = StyleSheet.create({});
