import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLOR_PRIMARY_DEFAULT, COLOR_SECONDARY_DEFAULT } from '../../../constants';
export const LinePagination = ({ currentPage, totalPages, paginationSelectedColor = COLOR_PRIMARY_DEFAULT, paginationColor = COLOR_SECONDARY_DEFAULT, style, }) => {
    const [selectedPage, setSelectedPage] = useState(-1);
    const [sizeAnim, setSizeAnim] = useState(getToValue()); // TODO: make this animated
    function getToValue() {
        return ((currentPage + 1) / (totalPages ?? 1)) * 100;
    }
    useEffect(() => {
        const toValue = getToValue();
        if (currentPage !== selectedPage) {
            setSelectedPage(currentPage);
            setSizeAnim(toValue);
        }
    }, [currentPage]);
    return (<View style={[styles.container, {}, style]}>
      <View style={[styles.lineContainer, { backgroundColor: paginationColor }]}>
        <Animated.View style={[
            styles.line,
            {
                width: sizeAnim + '%',
                backgroundColor: paginationSelectedColor,
            },
        ]}/>
      </View>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        height: 8,
        alignItems: 'center',
    },
    lineContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderRadius: 15,
        height: 8,
        margin: 'auto',
        backgroundColor: '#E6E6E6',
        width: '100%',
    },
    line: {
        backgroundColor: '#000000',
        borderRadius: 32,
        height: 8,
    },
});
