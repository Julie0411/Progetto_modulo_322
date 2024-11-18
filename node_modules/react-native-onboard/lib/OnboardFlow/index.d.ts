import React, { FC } from 'react';
import { PageProps } from './Page';
import { PrimaryButtonProps } from './components/PrimaryButton';
import { SecondaryButtonProps } from './components/SecondaryButton';
import { OnboardFlowProps, PaginationProps, TextStyles } from './types';
import { FormEntryField } from './components/InputField';
export type PageType = string;
export type OnboardPageConfigParams<Props> = {
    props: Props;
} & PageProps & TextStyles;
export type FormElementTypeConfigParams<Props> = {
    props: Props;
} & FormEntryField & TextStyles;
export type OnboardPageTypesConfig = {
    [key: string]: (params: OnboardPageConfigParams<any>) => React.ReactNode;
};
export type FormElementTypesConfig = {
    [key: string]: (params: FormElementTypeConfigParams<any>) => React.ReactNode;
};
export interface OnboardComponents {
    PrimaryButtonComponent: FC<PrimaryButtonProps>;
    SecondaryButtonComponent: FC<SecondaryButtonProps>;
    PaginationComponent: FC<PaginationProps>;
}
export declare const OnboardFlow: FC<OnboardFlowProps & TextStyles>;
