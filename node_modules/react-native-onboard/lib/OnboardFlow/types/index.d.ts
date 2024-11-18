import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { FC, ReactElement } from 'react';
import { FormElementTypesConfig, OnboardPageTypesConfig, PageType } from '../index';
import { FooterProps } from '../Footer';
import { PrimaryButtonProps } from '../components/PrimaryButton';
import { SecondaryButtonProps } from '../components/SecondaryButton';
export interface FlowItemData {
    id?: string;
    imageUri?: string;
    subtitle?: string;
    title?: string;
    subtitleStyle?: StyleProp<TextStyle> | undefined;
    titleStyle?: StyleProp<TextStyle> | undefined;
}
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginationSelectedColor?: string;
    paginationColor?: string;
    style?: StyleProp<ViewStyle> | any;
}
export interface PageData extends FlowItemData {
    imageComponent?: ReactElement;
    primaryButtonTitle?: string;
    secondaryButtonTitle?: string;
    showFooter?: boolean;
    showHeader?: boolean;
    type?: PageType;
    style?: StyleProp<ViewStyle> | any;
    props?: any;
    textStyle?: StyleProp<TextStyle> | undefined;
}
export interface TextStyles {
    subtitleStyle?: StyleProp<TextStyle> | undefined;
    textAlign?: 'left' | 'center' | 'right';
    textStyle?: StyleProp<TextStyle> | undefined;
    titleStyle?: StyleProp<TextStyle> | undefined;
}
export interface OnboardFlowProps {
    autoPlay?: boolean;
    backgroundImageUri?: string;
    dismissButtonStyle?: StyleProp<ViewStyle> | undefined;
    /**
     * @deprecated Use `type='fullscreen'` instead
     */
    fullscreenModal?: boolean;
    onBack?: () => void;
    onDone?: () => void;
    onNext?: () => void;
    onSaveData?: (data: StepResponseData, pageId: string) => void;
    canContinue?: boolean;
    setCanContinue?: (value: boolean) => void;
    pageStyle?: StyleProp<ViewStyle> | undefined;
    pageTypes?: OnboardPageTypesConfig;
    formElementTypes?: FormElementTypesConfig;
    pages?: PageData[];
    paginationColor?: string;
    paginationSelectedColor?: string;
    showDismissButton?: boolean;
    enableScroll?: boolean;
    style?: StyleProp<ViewStyle> | undefined;
    type?: 'inline' | 'fullscreen' | 'bottom-sheet';
    customVariables?: object;
    HeaderComponent?: FC<FooterProps>;
    FooterComponent?: FC<FooterProps>;
    PaginationComponent?: FC<PaginationProps>;
    PrimaryButtonComponent?: FC<PrimaryButtonProps>;
    primaryButtonStyle?: ViewStyle;
    primaryButtonTextStyle?: StyleProp<TextStyle>;
    SecondaryButtonComponent?: FC<SecondaryButtonProps>;
    primaryColor?: string;
    secondaryColor?: string;
    currentPage?: number;
    setCurrentPage?: (value: number) => void;
}
export interface StepResponseData {
    data: any;
    source: PageData;
}
export interface CardData extends FlowItemData {
    onCtaPress?: () => void;
    ctaText?: string;
    dismissible?: boolean;
}
