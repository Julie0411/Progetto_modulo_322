import { FC } from 'react';
import { OnboardPageConfigParams } from '../../index';
export interface PhoneNumberEntryPageProps {
    invalidNumberText?: string;
    onSetPhoneNumber?: (text: string) => void;
}
export declare const PhoneNumberEntryPage: FC<OnboardPageConfigParams<PhoneNumberEntryPageProps>>;
