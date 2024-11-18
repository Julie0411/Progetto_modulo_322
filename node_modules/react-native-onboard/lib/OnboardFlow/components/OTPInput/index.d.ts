import { FC } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyles } from '../../types';
interface OTPInputProps {
    code: string;
    setCode: (code: string) => void;
    maximumLength: number;
    setIsPinReady: (isPinReady: boolean) => void;
    style?: ViewStyle;
}
export declare const OTPInput: FC<OTPInputProps & TextStyles>;
export {};
