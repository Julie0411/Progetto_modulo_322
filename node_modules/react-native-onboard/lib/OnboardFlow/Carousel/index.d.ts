import { FC } from 'react';
import { CardData } from '../types';
export interface CarouselProps {
    cards: CardData[];
    onDismiss?: (dismissed: CardData) => void;
}
export declare const Carousel: FC<CarouselProps>;
