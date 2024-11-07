// Import necessary dependencies
import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetFooter, useBottomSheet } from '@gorhom/bottom-sheet';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { toRad } from 'react-native-redash';
import {useStyles} from "../../utils/hooks/useStyles";

// Create an animated version of RectButton
const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

// CustomFooter component that handles the bottom sheet's footer behavior
const CustomFooter = ({ animatedFooterPosition, darkThemeEnabled }) => {
    // Get styles based on dark theme setting
    const styles = useStyles(createStyles, darkThemeEnabled);
    // Get safe area insets for proper positioning
    const { bottom: bottomSafeArea } = useSafeAreaInsets();
    // Access bottom sheet functionality
    const { animatedIndex, snapToIndex } = useBottomSheet();
    // Create animated style for arrow rotation
    const arrowAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{
            // Rotate arrow based on bottom sheet position
            rotate: `${interpolate(
                animatedIndex.value,
                [0, 1],
                [toRad(0), toRad(-90)]
            )}rad`
        }]
    }));
    // Create animated style for container opacity
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [-0.85, 0], [0, 1]),
    }));
    // Handle arrow press to toggle bottom sheet position
    const handleArrowPress = useCallback(() => {
        snapToIndex(animatedIndex.value === 0 ? 2 : 0);
    }, [snapToIndex, animatedIndex]);
    // Memoize container styles
    const containerStyle = useMemo(
        () => [containerAnimatedStyle, styles.container],
        [containerAnimatedStyle, styles.container]
    );
    // Memoize arrow styles
    const arrowStyle = useMemo(
        () => [arrowAnimatedStyle, styles.arrow],
        [arrowAnimatedStyle, styles.arrow]
    );

    // Render the footer component
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

// Memoize the entire component for performance
export default React.memo(CustomFooter);

// Styles creation function with dark theme support
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
        backgroundColor: darkThemeEnabled ? 'black' : 'white', // Toggle background based on theme
        marginTop: 10,
        elevation: 8,
    },
    arrow: {
        fontSize: 20,
        height: 20,
        textAlignVertical: 'center',
        fontWeight: '900',
        color: darkThemeEnabled ? 'white' : 'black', // Toggle text color based on theme
    },
});
