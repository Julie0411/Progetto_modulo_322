import React, { useCallback, useMemo, useRef, useState } from "react";
import {View, StyleSheet, FlatList} from "react-native";
import Verification from "../components/Verification";
import CustomBackdrop from "../components/bottomSheet/CustomBackdrop";
import CustomFooter from "../components/bottomSheet/CustomFooter";
import SheetBody from "../components/bottomSheet/VerificationReviewSheet";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Verifications(props) {
    // Destructure props for easy access
    const { darkThemeEnabled, verifications, deleteVerification } = props;
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);
    // State for currently selected item
    const [item, setItem] = useState(null);
    // Reference for bottom sheet modal
    const bottomSheetModalRef = useRef(null);
    // Memoized snap points for bottom sheet
    const snapPoints = useMemo(() => ['20%','70%','100%'], []);
    // Memoized key extractor for FlatList
    const keyExtractor = useCallback((item) => item.id.toString(), []);
    // Handler to show bottom sheet modal
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    // Handler for item press - sets selected item and shows modal
    const handlePress = useCallback((selectedItem) => {
        setItem(selectedItem);
        handlePresentModalPress();
    }, [handlePresentModalPress]);
    // Handler for long press - deletes the verification
    const handleLongPress = useCallback((selectedItem) => {
        deleteVerification(selectedItem.id);
    }, [deleteVerification]);
    // Memoized render function for FlatList items
    const renderItem = useCallback(({ item }) => (
        <Verification
            item={item}
            darkThemeEnabled={darkThemeEnabled}
            press={() => handlePress(item)}
            longPress={() => handleLongPress(item)}
        />
    ), [darkThemeEnabled, handlePress, handleLongPress]);

    return (
        // Root view with gesture handling
        <GestureHandlerRootView style={styles.root}>
            <BottomSheetModalProvider>
                {/* Main content container */}
                <View style={styles.background}>
                    {/* List of verifications with performance optimizations */}
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
                {/* Bottom sheet modal for detailed view */}
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
// Style creation function that adapts to theme
const createStyles = (darkThemeEnabled) => StyleSheet.create({
    // Root container style
    root: {
        flex: 1,
    },
    // Main background container style
    background: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Bottom sheet handle style
    handleStyle: {
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    // Bottom sheet handle indicator style
    handleIndicatorStyle: {
        backgroundColor: darkThemeEnabled ? 'white' : 'black',
        marginTop: 5
    }
});
