import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
const minWidth = 8;
const maxWidth = 24;
const height = 8;
const marginHorizontal = 3;
export function DashDot({ selected, paginationSelectedColor, paginationColor }) {
    const sizeAnim = useRef(new Animated.Value(minWidth)).current;
    const [isSelected, setIsSelected] = useState(selected);
    useEffect(() => {
        if (selected) {
            Animated.timing(sizeAnim, {
                toValue: maxWidth,
                duration: 200,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start();
        }
        else {
            Animated.timing(sizeAnim, {
                toValue: minWidth,
                duration: 200,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start();
        }
        setIsSelected(selected);
    }, [selected]);
    return (<Animated.View style={[styles.dot, {
                width: sizeAnim,
                height: height,
                backgroundColor: selected ? paginationSelectedColor : paginationColor,
            }]}/>);
}
const styles = StyleSheet.create({
    dot: {
        width: minWidth,
        height: height,
        borderRadius: 32,
        marginHorizontal: marginHorizontal,
    },
});
