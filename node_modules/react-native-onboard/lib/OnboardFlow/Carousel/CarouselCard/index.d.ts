import { FC } from 'react';
import { ImageStyle, ViewStyle } from 'react-native';
import { CardData } from '../../types';
export interface CarouselCardProps {
    onPress?: () => void;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
    cardData: CardData;
    onDismiss?: (dismissed: CardData) => void;
    isFirst?: boolean;
}
export declare const CarouselCard: FC<CarouselCardProps>;
