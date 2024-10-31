import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetFooter, BottomSheetFooterProps, useBottomSheet } from '@gorhom/bottom-sheet';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { toRad } from 'react-native-redash';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

interface CustomFooterProps extends BottomSheetFooterProps {
    darkThemeEnabled: boolean;
}

const CustomFooter = ({ animatedFooterPosition, darkThemeEnabled }: CustomFooterProps) => {
    const styles = StyleSheet.create({
        container:{
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 24,
            marginBottom: 12,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: darkThemeEnabled ? 'black' : 'white',
            marginTop: 10,
            elevation: 8,
        },
        arrow: {
            fontSize: 20,
            height: 20,
            textAlignVertical: 'center',
            fontWeight: '900',
            color: darkThemeEnabled ? 'white' : 'black',
        },
    });
    const { bottom: bottomSafeArea } = useSafeAreaInsets();
    const { animatedIndex, snapToIndex } = useBottomSheet();
    const arrowAnimatedStyle = useAnimatedStyle(() => {
        const arrowRotate = interpolate(animatedIndex.value, [0, 1], [toRad(0), toRad(-180)]);
        return { transform: [{ rotate: `${arrowRotate}rad` }] };
    }, []);
    const arrowStyle = useMemo(() => [arrowAnimatedStyle, styles.arrow], [arrowAnimatedStyle]);
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [-0.85, 0], [0, 1]),
    }), [animatedIndex]);
    const containerStyle = useMemo(
        () => [containerAnimatedStyle, styles.container],
        [containerAnimatedStyle]
    );
    const handleArrowPress = useCallback(() => {
        if (animatedIndex.value === 0) {
            snapToIndex(2);
        } else {
            snapToIndex(0);
        }
    }, [snapToIndex]);

    return (
        <BottomSheetFooter bottomInset={bottomSafeArea} animatedFooterPosition={animatedFooterPosition}>
            <AnimatedRectButton style={containerStyle} onPress={handleArrowPress}>
                <Animated.Text style={arrowStyle}>⌃</Animated.Text>
            </AnimatedRectButton>
        </BottomSheetFooter>
    );
};




export default CustomFooter;
