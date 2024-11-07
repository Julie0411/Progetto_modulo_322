import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [0.1, 1], [0, 1]),
    }));

    const containerStyle = useMemo(
        () => [
            style,
            { backgroundColor: 'rgba(151,151,151,0.4)' },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle} />;
};

export default React.memo(CustomBackdrop);
