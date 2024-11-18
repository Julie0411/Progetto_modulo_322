import React from 'react';
import { FlatList, View } from 'react-native';
import { CarouselCard } from './CarouselCard';
export const Carousel = ({ cards, onDismiss }) => {
    const renderItem = ({ item, index = -1 }) => {
        return <CarouselCard cardData={item} onDismiss={onDismiss} isFirst={index === 0}/>;
    };
    if (cards.length === 1)
        return renderItem({ item: cards[0] });
    return (<FlatList data={cards} renderItem={renderItem} keyExtractor={(item, index) => item.id ?? `carousel-card-${index}`} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 20, overflow: 'visible' }} ItemSeparatorComponent={() => <View style={{ width: 20 }}/>}/>);
};
