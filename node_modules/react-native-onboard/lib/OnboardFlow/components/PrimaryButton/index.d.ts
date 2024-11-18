import { FC } from 'react';
import { TextStyle, ViewStyle, StyleProp } from 'react-native';
export interface PrimaryButtonProps {
    currentPage?: number;
    goToNextPage: () => void;
    style?: StyleProp<ViewStyle>;
    totalPages?: number;
    text?: string;
    textStyle: StyleProp<TextStyle>;
    disabled?: boolean;
}
export declare const PrimaryButton: FC<PrimaryButtonProps>;
