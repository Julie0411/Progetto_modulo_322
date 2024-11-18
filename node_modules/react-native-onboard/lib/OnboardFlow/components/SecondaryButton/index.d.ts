import { FC } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyles } from '../../types';
export interface SecondaryButtonProps {
    currentPage?: number;
    onPress: () => void;
    style?: ViewStyle;
    totalPages?: number;
    text: string;
    disabled?: boolean;
}
export declare const SecondaryButton: FC<SecondaryButtonProps & TextStyles>;
