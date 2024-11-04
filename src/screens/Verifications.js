import React, { useCallback, useMemo, useRef, useState } from "react";
import {View, StyleSheet, FlatList} from "react-native";
import Verification from "../components/Verification";
import CustomBackdrop from "../components/bottomSheet/CustomBackdrop";
import CustomFooter from "../components/bottomSheet/CustomFooter";
import SheetBody from "../components/bottomSheet/SheetBody";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    root: {
        flex: 1,
    },
    background: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    handleStyle: {
        backgroundColor: darkThemeEnabled ? 'rgba(0,0,0,1)' : 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    handleIndicatorStyle: {
        backgroundColor: darkThemeEnabled ? 'white' : 'black',
        marginTop: 5
    }
});

export default function Verifications(props) {
    const { darkThemeEnabled, verifications, deleteVerification } = props; // Destructure props

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]); // Memoize styles

    const [item, setItem] = useState(null);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['20%','70%','100%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePress = useCallback((selectedItem) => {
        setItem(selectedItem);
        handlePresentModalPress();
    }, [handlePresentModalPress]);

    const handleLongPress = useCallback((selectedItem) => {
        deleteVerification(selectedItem.id);
    }, [deleteVerification]);

    const renderItem = useCallback(({ item }) => (
        <Verification
            item={item}
            darkThemeEnabled={darkThemeEnabled}
            press={() => handlePress(item)}
            longPress={() => handleLongPress(item)}
        />
    ), [darkThemeEnabled, handlePress, handleLongPress]);

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    console.log('Verifications data:', verifications);

    return (
        <GestureHandlerRootView style={styles.root}>
            <BottomSheetModalProvider>
                <View style={styles.background}>
                    <FlatList
                        data={verifications}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    backdropComponent={CustomBackdrop}
                    footerComponent={CustomFooter}
                    handleStyle={styles.handleStyle}
                    handleIndicatorStyle={styles.handleIndicatorStyle}
                    enablePanDownToClose={true}
                    index={0}
                    keyboardBehavior="interactive"
                >
                    <SheetBody darkThemeEnabled={darkThemeEnabled} setItem={setItem} item={item} />
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}


