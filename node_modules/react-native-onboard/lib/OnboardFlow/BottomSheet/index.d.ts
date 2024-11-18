import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type BottomSheetProps = {
    height?: number;
    children?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle> | undefined;
};
export type BottomSheetRef = {
    open: () => void;
    close: () => void;
};
export declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<BottomSheetRef>>;
export {};
