import { FC } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyles } from '../../types';
export interface CardButtonProps {
    onPress: () => void;
    style?: ViewStyle;
    text?: string;
}
export declare const CardButton: FC<CardButtonProps & TextStyles>;
