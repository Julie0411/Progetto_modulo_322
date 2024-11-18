import { FC } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { OnboardComponents } from '../index';
import { PageData } from '../types';
export interface FooterProps {
    style?: StyleProp<ViewStyle> | undefined;
    Components: OnboardComponents;
    paginationSelectedColor?: string;
    paginationColor?: string;
    currentPage: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    pages?: PageData[];
    canContinue?: boolean;
    setCanContinue?: (value: boolean) => void;
    showFooter?: boolean;
    showHeader?: boolean;
    primaryButtonStyle?: StyleProp<ViewStyle>;
    primaryButtonTextStyle?: StyleProp<TextStyle>;
    props?: any;
}
export declare const Footer: FC<FooterProps>;
