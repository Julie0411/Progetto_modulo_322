import { FC } from 'react';
import { OnboardPageConfigParams } from '../../index';
export interface PhoneNumberVerificationPageProps {
    invalidCodeMessage?: string;
    onSetVerificationCode?: (text: string) => boolean;
    onResendVerificationCode?: () => void;
    resendCodeText?: string;
    invalidCodeText?: string;
    codeLength?: number;
}
export declare const PhoneNumberVerificationPage: FC<OnboardPageConfigParams<PhoneNumberVerificationPageProps>>;
