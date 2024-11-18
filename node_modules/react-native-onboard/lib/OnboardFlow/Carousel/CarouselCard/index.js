import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, } from 'react-native';
import { Card } from '../../components/Card';
import { CardButton } from './CardButton';
import closeIcon from './img/closeIcon.png';
const BASE_MARGIN_HORIZONTAL = 20;
export const CarouselCard = ({ style, onPress, cardData, imageStyle, onDismiss, isFirst }) => {
    const window = useWindowDimensions();
    const marginCount = isFirst ? 4 : 2;
    const cardWidth = window.width - BASE_MARGIN_HORIZONTAL * marginCount;
    const { title, subtitle, ctaText, onCtaPress } = cardData;
    return (<Pressable onPress={onPress} style={styles.wrapper}>
      <Card style={[style, { width: cardWidth }]}>
      {cardData.dismissible && (<TouchableOpacity style={styles.dismissWrapper} onPress={() => { onDismiss ? onDismiss(cardData) : null; }}>
              <Image source={closeIcon} resizeMode="contain" resizeMethod="resize" style={{ width: 12, height: 12 }}/>
            </TouchableOpacity>)}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.baseTitleStyle, cardData.titleStyle]}>{title}</Text>
            <Text style={[styles.baseSubTitleStyle, cardData.subtitleStyle]}>{subtitle}</Text>
            {onCtaPress && <CardButton text={ctaText ?? 'Learn More'} onPress={onCtaPress}/>}
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: cardData.imageUri }} accessibilityRole="image" resizeMode="contain" style={[styles.image, imageStyle]}/>
          </View>
        </View>
      </Card>
    </Pressable>);
};
const styles = StyleSheet.create({
    wrapper: {
        overflow: 'visible',
        alignSelf: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'space-around',
    },
    textContainer: {
        flex: 2,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        width: 68,
        height: 68,
    },
    baseTitleStyle: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 18,
        marginVertical: 4,
    },
    baseSubTitleStyle: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: '#333333',
        marginVertical: 4,
    },
    dismissWrapper: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 27,
        height: 27,
        backgroundColor: '#000000',
        borderRadius: 100,
        top: -13,
        right: -13,
        elevation: 1,
        zIndex: 1,
    }
});
