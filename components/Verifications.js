import React, { useCallback, useMemo, useRef, useState } from "react";
import {View, StyleSheet, FlatList} from "react-native";
import Verification from "./Verification";
import CustomBackdrop from "./ButtomSheet/CustomBackdrop";
import CustomFooter from "./ButtomSheet/CustomFooter";
import SheetBody from "./ButtomSheet/SheetBody";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Verifications(props) {
    const { darkThemeEnabled, verifications } = props;
    const styles = StyleSheet.create({
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
    const [item, setItem] = useState(null);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['20%','70%','100%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    function handlePress(selectedItem) {
        setItem(selectedItem);
        handlePresentModalPress();
    }

    function handleLongPress(selectedItem) {
        props.deleteVerification(selectedItem.id);
    }

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <View style={styles.background}>
                    <FlatList
                        data={verifications}
                        renderItem={({ item }) => (
                            <Verification item={item} darkThemeEnabled={darkThemeEnabled} press={() => handlePress(item)} longPress={() => handleLongPress(item)}/>
                        )}
                        showsVerticalScrollIndicator={false}
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
