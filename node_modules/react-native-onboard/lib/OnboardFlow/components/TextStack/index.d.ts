import { FC } from 'react';
import { TextStyles } from '../../types';
export interface TextStackProps {
    subtitle?: string;
    title?: string;
}
export declare const TextStack: FC<TextStackProps & TextStyles>;
