import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheetFooter, useBottomSheet} from '@gorhom/bottom-sheet';
import {RectButton} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {interpolate, useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {toRad} from 'react-native-redash';
import {useStyles} from "../../utils/hooks/useStyles";
import * as Haptics from "expo-haptics";

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const CustomFooter = ({animatedFooterPosition, darkThemeEnabled}) => {
    // Memoized styles based on theme
    const styles = useStyles(createStyles, darkThemeEnabled);

    const {bottom: bottomSafeArea} = useSafeAreaInsets();

    const {animatedIndex, snapToIndex} = useBottomSheet();

    const derivedIndex = useDerivedValue(() => animatedIndex.value);

    const arrowAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{
            rotate: `${interpolate(
                derivedIndex.value,
                [0, 1],
                [toRad(0), toRad(-90)]
            )}rad`
        }]
    }));

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(derivedIndex.value, [-0.85, 0], [0, 1]),
    }));

    const handleArrowPress = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        snapToIndex(derivedIndex.value === 0 ? 2 : 0);
    }, [snapToIndex, derivedIndex]);

    const containerStyle = useMemo(
        () => [containerAnimatedStyle, styles.container],
        [containerAnimatedStyle, styles.container]
    );

    const arrowStyle = useMemo(
        () => [arrowAnimatedStyle, styles.arrow],
        [arrowAnimatedStyle, styles.arrow]
    );

    return (
        <BottomSheetFooter
            bottomInset={bottomSafeArea}
            animatedFooterPosition={animatedFooterPosition}
        >
            <AnimatedRectButton style={containerStyle} onPress={handleArrowPress}>
                <Animated.Text style={arrowStyle}>⌃</Animated.Text>
            </AnimatedRectButton>
        </BottomSheetFooter>
    );
};

export default React.memo(CustomFooter);

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    container: {
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
