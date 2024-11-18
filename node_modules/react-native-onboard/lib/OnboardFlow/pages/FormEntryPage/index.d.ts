import { FC } from 'react';
import { OnboardPageConfigParams } from '../../index';
import { FormEntryField } from '../../components/InputField';
export interface FormEntryPageProps {
    fields: FormEntryField[];
}
export declare const FormEntryPage: FC<OnboardPageConfigParams<FormEntryPageProps>>;
