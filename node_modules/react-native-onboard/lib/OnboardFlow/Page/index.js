import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, ScrollView } from 'react-native';
import { HORIZONTAL_PADDING_DEFAULT, TEXT_ALIGN_DEFAULT, VERTICAL_PADDING_DEFAULT, } from '../constants';
import { TextStack } from '../components/TextStack';
export const Page = ({ style, titleStyle, subtitleStyle, textStyle, pageData, pageIndex, customVariables, currentPage, totalPages, goToNextPage, goToPreviousPage, textAlign = TEXT_ALIGN_DEFAULT, width, maxTextHeight, setMaxTextHeight, onSaveData, primaryColor, secondaryColor, }) => {
    const [imageHeight, setImageHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height ?? 0);
    const onContainerLayout = (event) => {
        setContainerHeight(event.nativeEvent.layout.height);
    };
    const onTextStackLayout = (event) => {
        setMaxTextHeight && setMaxTextHeight(event.nativeEvent.layout.height);
    };
    useEffect(() => {
        if (pageData.imageUri) {
            Image.getSize(pageData.imageUri, (width, height) => {
                setImageHeight(height);
            });
        }
    }, [pageData.imageUri]);
    function ImageComponent() {
        if (pageData.imageComponent) {
            return pageData.imageComponent;
        }
        return null;
    }
    return (<View style={[styles.container, style, { width: width }]} onLayout={onContainerLayout}>
      {pageData.imageUri && (<Image source={{ uri: pageData.imageUri }} style={{ width: 'auto', height: '50%', marginVertical: VERTICAL_PADDING_DEFAULT * 3 }} resizeMode="contain"/>)}
      <View style={styles.imageComponentWrapper}>
        <ImageComponent />
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView onLayout={onTextStackLayout}>
          <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign} titleStyle={titleStyle} subtitleStyle={subtitleStyle}/>
        </ScrollView>
      </View>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    },
    image: {
        width: '100%',
        marginVertical: VERTICAL_PADDING_DEFAULT * 3,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    imageComponentWrapper: {
        alignItems: 'center',
    },
});
