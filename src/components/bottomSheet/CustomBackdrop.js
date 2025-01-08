import React, {useMemo} from "react";
import Animated, {interpolate, useAnimatedStyle, useDerivedValue} from "react-native-reanimated";

const CustomBackdrop = ({animatedIndex, style}) => {
    // Combine styles using useMemo
    const containerStyle = useMemo(
        () => [
            style,
            {backgroundColor: 'rgba(151,151,151,0.4)'},
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );
    // Safely derive animatedIndex value
    const derivedIndex = useDerivedValue(() => animatedIndex.value);
    // Create animated style for opacity
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(derivedIndex.value, [0.1, 1], [0.5, 1]),
    }));

    return <Animated.View style={containerStyle}/>;
};

export default React.memo(CustomBackdrop);
