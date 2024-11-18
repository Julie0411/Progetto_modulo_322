import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PageData, TextStyles } from '../types';
import { FormElementTypesConfig } from '../index';
export interface PageProps {
    style?: StyleProp<ViewStyle> | undefined;
    pageIndex: number;
    currentPage: number;
    totalPages: number;
    pageData: PageData;
    formElementTypes?: FormElementTypesConfig;
    customVariables?: object;
    goToNextPage: () => void;
    onSaveData?: (data: any) => void;
    goToPreviousPage: () => void;
    textAlign?: 'left' | 'center' | 'right';
    width: number;
    maxTextHeight?: number;
    setMaxTextHeight?: (height: number) => void;
    primaryColor?: string;
    secondaryColor?: string;
    canContinue?: boolean;
    setCanContinue?: (value: boolean) => void;
}
export declare const Page: FC<PageProps & TextStyles>;
