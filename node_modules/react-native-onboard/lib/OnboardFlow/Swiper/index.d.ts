import React from 'react';
import { FlatListProps } from 'react-native';
import { SwiperFlatListRefProps } from './SwiperProps';
export declare const SwiperFlatList: React.ForwardRefExoticComponent<Partial<FlatListProps<any>> & {
    data?: any[];
    vertical?: boolean;
    index?: number;
    renderAll?: boolean;
    renderItem?: import("react-native").ListRenderItem<any>;
    onChangeIndex?: (item: {
        index: number;
        prevIndex: number;
    }) => void;
    disableGesture?: boolean;
    e2eID?: string;
    autoplayDelay?: number;
    autoplay?: boolean;
    autoplayInvertDirection?: boolean;
    autoplayLoop?: boolean;
    autoplayLoopKeepAnimation?: boolean;
    onMomentumScrollEnd?: (item: {
        index: number;
    }, event: any) => void;
    onViewableItemsChanged?: (info: {
        viewableItems: import("react-native").ViewToken[];
        changed: import("react-native").ViewToken[];
    }) => void;
    overScrollMode?: "auto" | "always" | "never";
    viewabilityConfig?: import("react-native").ViewabilityConfig;
} & React.RefAttributes<SwiperFlatListRefProps>>;
type Handle<T> = T extends React.ForwardRefExoticComponent<React.RefAttributes<infer T2>> ? T2 : never;
export type SwiperFlatList = Handle<typeof SwiperFlatList>;
export {};
