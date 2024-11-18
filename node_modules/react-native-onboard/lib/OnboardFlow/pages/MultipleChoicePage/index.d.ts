import { FC } from 'react';
import { OnboardPageConfigParams } from '../../index';
export interface MultipleChoicePageProps {
    fields: MultipleChoiceField[];
    minChoices?: number;
    maxChoices?: number;
    onOptionsUpdated?: (options: MultipleChoiceField[]) => void;
}
export interface MultipleChoiceField {
    id?: string;
    title?: string;
    subtitle?: string;
    onUpdated?: (selected: boolean) => void;
}
export declare const MultipleChoicePage: FC<OnboardPageConfigParams<MultipleChoicePageProps>>;
