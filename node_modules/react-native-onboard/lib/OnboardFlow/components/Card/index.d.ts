import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
interface CardProps {
    style?: ViewStyle | ViewStyle[];
    children: React.ReactNode;
}
export declare const Card: FC<CardProps>;
export {};
