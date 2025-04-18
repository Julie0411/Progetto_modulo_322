import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import {Dimensions, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import CustomBackdrop from "../components/bottomSheet/CustomBackdrop";
import CustomFooter from "../components/bottomSheet/CustomFooter";
import VerificationReviewSheet from "../components/bottomSheet/VerificationReviewSheet";
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {formatDate} from "../utils/formatters/dateFormatter";
import * as Haptics from "expo-haptics";
import {ThemeContext} from "../context/ThemeContext";
import {VerificationsContext} from "../context/VerificationsContext";

export default function Verifications() {

    const { darkThemeEnabled } = useContext(ThemeContext);
    // Create memoized styles based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const { verifications, deleteVerification } = useContext(VerificationsContext);
    // State for currently selected item
    const [item, setItem] = useState(null);
    // Reference for bottom sheet modal
    const bottomSheetModalRef = useRef(null);
    // Memoized snap points for bottom sheet
    const snapPoints = useMemo(() => ['20%', '70%'], []);
    // Memoized key extractor for FlatList
    const keyExtractor = useCallback((item) => item.id.toString(), []);
    // Handler to show bottom sheet modal
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    // Handler for item press - sets selected item and shows modal
    const handlePress = useCallback((selectedItem) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        setItem(selectedItem);
        handlePresentModalPress();
    }, [handlePresentModalPress]);
    // Handler for long press - deletes the verification
    const handleLongPress = useCallback((selectedItem) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        deleteVerification(selectedItem.id);
    }, [deleteVerification]);
    // Memoized render function for FlatList items
    const renderItem = useCallback(({item}) => (
        <View style={styles.container}>
            <Pressable
                onLongPress={() => handleLongPress(item)}
                onPress={() => handlePress(item)}
                style={({pressed}) => [styles.pressable, pressed && styles.pressedItem]}
            >
                <View style={styles.leftSection}>
                    <Text style={styles.itemText} numberOfLines={1}>{item.teacher} {item.subject}</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.itemText} numberOfLines={1}>{formatDate(item.data.dateTime)}</Text>
                </View>
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
                    {verifications.length === 0 ? (
                        <Text style={styles.textHolder}>Non c’è nessuna verifica</Text>
                    ) : (
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
                    )}
                </View>
                {/* Bottom sheet modal for detailed view */}
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    backdropComponent={CustomBackdrop}
                    footerComponent={CustomFooter}
                    handleStyle={styles.handleStyle}
                    handleIndicatorStyle={styles.handleIndicatorStyle}
                    backgroundStyle={{backgroundColor: darkThemeEnabled ? 'black' : 'white'}}
                    enablePanDownToClose={true}
                    index={0}
                    keyboardBehavior="interactive"
                >
                    <VerificationReviewSheet setItem={setItem} item={item}/>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        width: Dimensions.get("window").width - 20,
        height: 60,
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
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    itemText: {
        color: darkThemeEnabled ? 'white' : 'black',
    },
    pressedItem: {
        backgroundColor: 'rgba(155,155,155,0.3)',
    },
    textHolder: {
        color: darkThemeEnabled ? 'white' : 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
    },
});
