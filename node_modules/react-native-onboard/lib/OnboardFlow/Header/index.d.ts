import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { OnboardComponents } from '../index';
import { PageData } from '../types';
export interface HeaderProps {
    style?: StyleProp<ViewStyle> | undefined;
    Components: OnboardComponents;
    paginationSelectedColor?: string;
    paginationColor?: string;
    currentPage: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    pages?: PageData[];
    props?: any;
}
export declare const Header: FC<HeaderProps>;
