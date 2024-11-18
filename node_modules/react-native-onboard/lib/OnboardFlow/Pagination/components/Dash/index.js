import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_PRIMARY_DEFAULT, COLOR_SECONDARY_DEFAULT, VERTICAL_PADDING_DEFAULT, } from '../../../constants';
import { Dash } from './Dash';
export const DashPagination = ({ currentPage, totalPages, paginationSelectedColor, paginationColor, }) => {
    const elements = [];
    for (let i = 0; i < totalPages; i++) {
        elements.push(<Dash paginationColor={paginationColor ?? COLOR_SECONDARY_DEFAULT} paginationSelectedColor={paginationSelectedColor ?? COLOR_PRIMARY_DEFAULT} key={i} selected={i === currentPage}/>);
    }
    return <View style={styles.container}>{elements}</View>;
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: VERTICAL_PADDING_DEFAULT,
    },
});
