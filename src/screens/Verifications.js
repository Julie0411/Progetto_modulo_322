import React, { useCallback, useMemo, useRef, useState } from "react";
import {View, StyleSheet, FlatList, Pressable, Text, Dimensions} from "react-native";
import CustomBackdrop from "../components/bottomSheet/CustomBackdrop";
import CustomFooter from "../components/bottomSheet/CustomFooter";
import SheetBody from "../components/bottomSheet/VerificationReviewSheet";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {formatDate} from "../utils/formatters/dateFormatter";

export default function Verifications({ darkThemeEnabled, verifications, deleteVerification }) {
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
        <View style={styles.container}>
            <Pressable
                onLongPress={() => handleLongPress(item)}
                onPress={() => handlePress(item)}
                // Dynamic style based on pressed state
                style={({ pressed }) => [styles.pressable, pressed && styles.pressedItem]}
            >
                {/* Display item title with single line truncation */}
                <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
                {/* Display formatted date with single line truncation */}
                <Text style={styles.text} numberOfLines={1}>{formatDate(item.data.dateTime)}</Text>
            </Pressable>
        </View>
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
        backgroundColor: darkThemeEnabled ? 'black' : 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    handleIndicatorStyle: {
        backgroundColor: darkThemeEnabled ? 'white' : 'black',
        marginTop: 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20,
        borderRadius: 5,
        overflow: 'hidden',
        width: Dimensions.get("window").width - 20,
        height: 60,
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    text: {
        color: darkThemeEnabled ? 'white' : 'black',
        flexShrink: 1,
        marginRight: 10,
    },
    pressedItem: {
        backgroundColor: 'rgba(155,155,155,0.3)',
    }
});
