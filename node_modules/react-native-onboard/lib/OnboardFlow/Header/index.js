import React from 'react';
import { StyleSheet, View } from 'react-native';
export const Header = ({ style, Components, paginationSelectedColor, paginationColor, currentPage, goToNextPage, pages, ...props }) => {
    const totalPages = pages?.length ?? 0;
    return (<View style={[style]} {...props}>
      <Components.PaginationComponent paginationColor={paginationColor} paginationSelectedColor={paginationSelectedColor} currentPage={currentPage} totalPages={totalPages}/>
    </View>);
};
const styles = StyleSheet.create({});
