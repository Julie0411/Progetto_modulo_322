import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
const minWidth = 16;
const maxWidth = 16;
const height = 4;
export function Dash({ selected, paginationSelectedColor, paginationColor }) {
    const sizeAnim = useRef(new Animated.Value(8)).current;
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
                duration: 250,
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
        marginHorizontal: 2,
    },
});
