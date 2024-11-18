import { FC } from 'react';
import { ColorValue } from 'react-native';
import { TextStyles } from '../../types';
export interface FormEntryField {
    label?: string;
    placeHolder?: string;
    type: string;
    /**
     * @deprecated Use onSaveData instead
     */
    onSetText?: (text: string) => void;
    onSaveData?: (data: any) => void;
    getErrorMessage?: (text: string) => string;
    isRequired?: boolean;
    prefill?: string;
    id: string;
    primaryColor?: string;
    secondaryColor?: string;
    canContinue?: boolean;
    setCanContinue?: (value: boolean) => void;
    setHasError?: (value: boolean) => void;
    autoFocus?: boolean;
    backgroundColor?: ColorValue;
    currentPage?: number;
    pageIndex?: number;
    totalPages?: number;
    props?: any;
}
export declare const InputField: FC<FormEntryField & TextStyles>;
